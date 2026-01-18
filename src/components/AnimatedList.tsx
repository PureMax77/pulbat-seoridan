import React, { useRef, useState, useEffect, useCallback, ReactNode, MouseEventHandler, UIEvent } from 'react';
import { motion, useInView } from 'motion/react';

/**
 * AnimatedItem 컴포넌트 Props
 */
interface AnimatedItemProps {
  /** 리스트 아이템 내부 컨텐츠 */
  children: ReactNode;
  /** 애니메이션 지연 시간 (초 단위) */
  delay?: number;
  /** 아이템의 인덱스 */
  index: number;
  /** 마우스 호버 핸들러 */
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  /** 클릭 핸들러 */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

/**
 * 개별 리스트 아이템 컴포넌트
 * 
 * - 화면에 진입할 때(inView) 페이드인 및 스케일 업 애니메이션 적용
 * - Framer Motion 사용
 */
const AnimatedItem: React.FC<AnimatedItemProps> = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  // 뷰포트 진입 감지 (50% 보일 때 트리거)
  const inView = useInView(ref, { amount: 0.5, once: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      className="mb-3 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

/**
 * AnimatedList 컴포넌트 Props
 */
interface AnimatedListProps<T = string> {
  /** 표시할 데이터 배열 */
  items?: T[];
  /** 아이템 선택 시 호출되는 콜백 */
  onItemSelect?: (item: T, index: number) => void;
  /** 커스텀 아이템 렌더링 함수 */
  renderItem?: (item: T, index: number, isSelected: boolean) => ReactNode;
  /** 상/하단 그라데이션 표시 여부 */
  showGradients?: boolean;
  /** 키보드 화살표 네비게이션 활성화 여부 */
  enableArrowNavigation?: boolean;
  /** 최상위 컨테이너 클래스 */
  className?: string;
  /** 스크롤 컨테이너 클래스 */
  containerClassName?: string;
  /** 기본 아이템 렌더링 시 적용할 클래스 */
  itemClassName?: string;
  /** 스크롤바 표시 여부 */
  displayScrollbar?: boolean;
  /** 초기 선택된 인덱스 */
  initialSelectedIndex?: number;
  /** 리스트 최대 높이 (Tailwind 클래스) */
  maxHeight?: string;
}

/**
 * 애니메이션 리스트 컴포넌트
 * 
 * - 스크롤 시 아이템들이 순차적으로 나타나는 애니메이션 효과 제공
 * - 키보드 네비게이션 지원 (화살표 위/아래, 엔터)
 * - 상/하단 스크롤 인디케이터 그라데이션
 * - 제네릭 타입 T를 사용하여 다양한 데이터 타입 지원
 */
const AnimatedList = <T = string,>({
  items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12',
    'Item 13',
    'Item 14',
    'Item 15'
  ] as T[],
  onItemSelect,
  renderItem,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  containerClassName = '',
  itemClassName = '',
  displayScrollbar = true,
  initialSelectedIndex = -1,
  maxHeight = 'max-h-[400px]'
}: AnimatedListProps<T>) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState<boolean>(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState<number>(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState<number>(1);

  // 아이템 마우스 진입 시 선택 상태 변경
  const handleItemMouseEnter = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  // 아이템 클릭 핸들러
  const handleItemClick = useCallback(
    (item: T, index: number) => {
      setSelectedIndex(index);
      if (onItemSelect) {
        onItemSelect(item, index);
      }
    },
    [onItemSelect]
  );

  // 스크롤 이벤트 핸들러: 상/하단 그라데이션 투명도 조절
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
  };

  // 키보드 네비게이션 이벤트 리스너 등록
  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          if (onItemSelect) {
            onItemSelect(items[selectedIndex], selectedIndex);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  // 키보드 조작 시 선택된 아이템이 뷰포트에 보이도록 자동 스크롤
  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement | null;
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      
      // 위로 스크롤
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
      } 
      // 아래로 스크롤
      else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth'
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  return (
    <div className={`relative w-[500px] ${className}`}>
      <div
        ref={listRef}
        className={`${maxHeight} overflow-y-auto ${containerClassName} ${displayScrollbar
          ? '[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-[#060010] [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-thumb]:rounded-[4px]'
          : 'scrollbar-hide'
          }`}
        onScroll={handleScroll}
        style={{
          scrollbarWidth: displayScrollbar ? 'thin' : 'none',
          scrollbarColor: '#222 #060010'
        }}
      >
        {items.map((item, index) => (
          <AnimatedItem
            key={index}
            delay={0.1}
            index={index}
            onMouseEnter={() => handleItemMouseEnter(index)}
            onClick={() => handleItemClick(item, index)}
          >
            {renderItem ? (
              renderItem(item, index, selectedIndex === index)
            ) : (
              <div className={`p-4 bg-[#111] rounded-lg ${selectedIndex === index ? 'bg-[#222]' : ''} ${itemClassName}`}>
                <p className="text-white m-0">{String(item)}</p>
              </div>
            )}
          </AnimatedItem>
        ))}
      </div>
      {showGradients && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-[50px] bg-linear-to-b from-[#060010] to-transparent pointer-events-none transition-opacity duration-300 ease"
            style={{ opacity: topGradientOpacity }}
          ></div>
          <div
            className="absolute bottom-0 left-0 right-0 h-[100px] bg-linear-to-t from-[#060010] to-transparent pointer-events-none transition-opacity duration-300 ease"
            style={{ opacity: bottomGradientOpacity }}
          ></div>
        </>
      )}
    </div>
  );
};

export default AnimatedList;
