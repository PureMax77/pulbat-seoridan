'use client';

import React, { useEffect, useState, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import { motion, useMotionValue, useSpring, PanInfo, useAnimation } from 'motion/react';

/**
 * CircularCard 외부 제어 메서드 인터페이스
 */
export interface CircularCardRef {
  /** 다음 카드로 회전 */
  next: () => void;
  /** 이전 카드로 회전 */
  prev: () => void;
}

/**
 * CircularCard 컴포넌트 Props
 * 제네릭 타입 T를 사용하여 다양한 아이템 데이터 지원
 */
interface CircularCardProps<T> {
  /** 표시할 아이템 데이터 배열 */
  items: T[];
  /** 개별 아이템 렌더링 함수 */
  renderItem: (item: T, index: number, isActive: boolean) => React.ReactNode;
  /** 각 카드의 너비 (px) @default 300 */
  itemWidth?: number;
  /** 카드 간 간격 (px) @default 20 */
  gap?: number;
  /** 중앙 카드가 변경될 때 호출되는 콜백 */
  onCenterIndexChange?: (index: number) => void;
  /** 추가 클래스명 */
  className?: string;
  /** 3D 원근감 깊이 (px) @default 1000 */
  perspective?: number;
  /** 전체 스케일 @default 1 */
  scale?: number;
  /** 드래그 민감도 @default 0.15 */
  dragSensitivity?: number;
  /** 드래그 후 관성 모멘텀 @default 0.01 */
  momentumMultiplier?: number;
}

/**
 * CircularCard 컴포넌트
 * 
 * - 3D Carousel 형태의 순환 카드 리스트입니다.
 * - 드래그(Pan) 제스처를 지원하며, 관성 스크롤 효과가 적용됩니다.
 * - Framer Motion을 사용하여 부드러운 3D 회전 애니메이션을 구현합니다.
 */
function CircularCardInner<T>(
  {
    items,
    renderItem,
    itemWidth = 300,
    gap = 20,
    onCenterIndexChange,
    className = '',
    perspective = 1000,
    scale = 1,
    dragSensitivity = 0.15,
    momentumMultiplier = 0.01
  }: CircularCardProps<T>,
  ref: React.Ref<CircularCardRef>
) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Carousel 설정 계산
  const count = items.length;
  // 전체 둘레 계산
  const circumference = (itemWidth + gap) * count;
  // 반지름 계산 (아이템들이 겹치지 않고 원형으로 배치되도록)
  const radius = Math.max(circumference / (2 * Math.PI), itemWidth * 1.5);
  // 각 아이템 간의 각도
  const angleStep = 360 / count;

  // 회전 값 상태 관리 (MotionValue)
  const rotation = useMotionValue(0);
  // 부드러운 회전을 위한 Spring 애니메이션 적용
  const rotationSpring = useSpring(rotation, {
    stiffness: 150,
    damping: 30,
    mass: 1
  });

  const controls = useAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDragging = useRef(false);

  // 특정 각도로 애니메이션 이동
  const animateTo = useCallback((target: number) => {
    controls.start({
      rotateY: target,
      transition: { type: "spring", stiffness: 150, damping: 30, mass: 1 }
    });
    rotation.set(target);
  }, [controls, rotation]);

  // 외부 제어 함수 (Ref를 통해 노출)
  useImperativeHandle(ref, () => ({
    next: () => {
      const current = rotation.get();
      const target = Math.round(current / angleStep) * angleStep - angleStep;
      animateTo(target);
    },
    prev: () => {
      const current = rotation.get();
      const target = Math.round(current / angleStep) * angleStep + angleStep;
      animateTo(target);
    }
  }));

  // 컨테이너 크기 변경 감지 (현재는 사용하지 않지만 향후 확장을 위해 유지)
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      // 향후 컨테이너 크기 기반 로직이 필요할 경우 사용
      if (containerRef.current) {
        // const width = containerRef.current.offsetWidth;
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // 회전 값 변화 감지하여 현재 중앙 인덱스 계산
  useEffect(() => {
    const unsubscribe = rotationSpring.on("change", (latest) => {
      const normalizedRotation = ((latest % 360) + 360) % 360;
      let index = Math.round(normalizedRotation / angleStep);
      // 인덱스 방향 보정 (회전 방향에 따라 인덱스 계산)
      index = (count - index) % count;

      if (index !== currentIndex) {
        setCurrentIndex(index);
        onCenterIndexChange?.(index);
      }
    });
    return () => unsubscribe();
  }, [rotationSpring, count, angleStep, currentIndex, onCenterIndexChange]);

  // 드래그(Pan) 핸들러
  const handlePan = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDragging.current = true;
    rotation.set(rotation.get() + info.delta.x * dragSensitivity);
  };

  // 드래그 종료 시 관성 스크롤 및 스냅 처리
  const handlePanEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDragging.current = false;
    const velocity = info.velocity.x;
    const currentRotation = rotation.get();

    // 관성 적용 후 예상 최종 회전 각도 계산
    const estimatedEndRotation = currentRotation + velocity * momentumMultiplier;

    // 가장 가까운 아이템 각도로 스냅 (자석 효과)
    const snappedRotation = Math.round(estimatedEndRotation / angleStep) * angleStep;

    animateTo(snappedRotation);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing ${className}`}
      style={{
        perspective: `${perspective}px`,
        touchAction: 'none' // 브라우저 기본 터치 동작 방지
      }}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          rotateY: rotationSpring,
          width: itemWidth,
          height: "100%",
          scale: scale
        }}
        animate={controls}
      >
        {items.map((item, index) => {
          const angle = index * angleStep;
          const isActive = index === currentIndex;

          return (
            <div
              key={index}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              style={{
                // 각 아이템을 원형으로 배치 (Y축 회전 + Z축 이동)
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'visible',
              }}
            >
              <div
                className="w-full h-full transition-opacity duration-300"
                style={{
                  opacity: isActive ? 1 : 0.6,
                  pointerEvents: isActive ? 'auto' : 'none',
                  // 활성화된 카드는 약간 확대
                  transform: `scale(${isActive ? 1 : 0.95})`,
                  transition: 'all 0.3s ease'
                }}
              >
                {renderItem(item, index, isActive)}
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

// forwardRef로 감싸서 외부에서 ref 접근 가능하게 설정
export default forwardRef(CircularCardInner) as <T>(
  props: CircularCardProps<T> & { ref?: React.Ref<CircularCardRef> }
) => React.ReactElement;
