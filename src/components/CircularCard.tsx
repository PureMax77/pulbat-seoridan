'use client';

import React, { useEffect, useState, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import { motion, useMotionValue, useSpring, PanInfo, useAnimation } from 'motion/react';

export interface CircularCardRef {
  next: () => void;
  prev: () => void;
}

interface CircularCardProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isActive: boolean) => React.ReactNode;
  itemWidth?: number;
  gap?: number;
  onCenterIndexChange?: (index: number) => void;
  className?: string;
  perspective?: number;
  scale?: number;
  dragSensitivity?: number;
  momentumMultiplier?: number;
}

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
  const [width, setWidth] = useState(0);

  // 3D Carousel 설정
  const count = items.length;
  const circumference = (itemWidth + gap) * count;
  const radius = Math.max(circumference / (2 * Math.PI), itemWidth * 1.5);
  const angleStep = 360 / count;

  const rotation = useMotionValue(0);
  const rotationSpring = useSpring(rotation, {
    stiffness: 150,
    damping: 30,
    mass: 1
  });

  const controls = useAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDragging = useRef(false);

  // 외부 제어 함수
  const animateTo = useCallback((target: number) => {
    controls.start({
      rotateY: target,
      transition: { type: "spring", stiffness: 150, damping: 30, mass: 1 }
    });
    rotation.set(target);
  }, [controls, rotation]);

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

  // 리사이즈 핸들링
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // 현재 인덱스 계산 및 콜백 호출
  useEffect(() => {
    const unsubscribe = rotationSpring.on("change", (latest) => {
      const normalizedRotation = ((latest % 360) + 360) % 360;
      let index = Math.round(normalizedRotation / angleStep);
      index = (count - index) % count;

      if (index !== currentIndex) {
        setCurrentIndex(index);
        onCenterIndexChange?.(index);
      }
    });
    return () => unsubscribe();
  }, [rotationSpring, count, angleStep, currentIndex, onCenterIndexChange]);

  const handlePan = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDragging.current = true;
    rotation.set(rotation.get() + info.delta.x * dragSensitivity);
  };

  const handlePanEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDragging.current = false;
    const velocity = info.velocity.x;
    const currentRotation = rotation.get();

    // 관성 적용 후 예상 회전 각도
    const estimatedEndRotation = currentRotation + velocity * momentumMultiplier;

    // 가장 가까운 아이템 각도로 스냅
    const snappedRotation = Math.round(estimatedEndRotation / angleStep) * angleStep;

    animateTo(snappedRotation);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing ${className}`}
      style={{
        perspective: `${perspective}px`,
        touchAction: 'none'
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
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'visible',
              }}
            >
              <div
                className="w-full h-full transition-opacity duration-300"
                style={{
                  opacity: isActive ? 1 : 0.6,
                  pointerEvents: isActive ? 'auto' : 'none',
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

export default forwardRef(CircularCardInner) as <T>(
  props: CircularCardProps<T> & { ref?: React.Ref<CircularCardRef> }
) => React.ReactElement;
