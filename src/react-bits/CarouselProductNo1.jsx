import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import RobinoIcon from '@/components/RobinoIcon';
import { GetFromCar1 } from '@/components/supabase/GetFromCar1';
import { useQuery } from '@tanstack/react-query';
import ImageLoader from '@/loaders/ImageLoader';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselProductItem({
  item,
  index,
  itemWidth,
  round,
  trackItemOffset,
  x,
  transition,
  isAnimating 
}) {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset
  ];

  const rotateY = useTransform(x, range, [90, 0, -90], {
    clamp: false
  });

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      className={`relative shrink-0 flex flex-col ${
        round
          ? 'items-center justify-center text-center bg-[#060010] border-0'
          : 'items-start justify-between border border-[#222] rounded-[12px]'
      } overflow-hidden cursor-grab active:cursor-grabbing`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : '100%',
        rotateY,
        ...(round && { borderRadius: '50%' })
      }}
      transition={transition}
    >
      {!isLoaded && (
        <div className="absolute inset-0 z-10">
          <ImageLoader className="rounded-[12px]" />
        </div>
      )}

      <div className={`w-full h-full ${isAnimating ? "pointer-events-none" : ""}`}>
        <Zoom>
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsLoaded(true)}
          />
        </Zoom>
      </div>

      <div className={`${round ? 'p-0 m-0' : 'mb-4 p-5'} relative z-20 pointer-events-none`}>
        <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#060010]">
          <RobinoIcon size={20} />
        </span>
      </div>

      <div className="p-5 relative z-20 pointer-events-none">
        <div className="mb-1 font-black text-lg text-white">
          {item.title}
        </div>
      </div>
    </motion.div>
  );
}

export default function CarouselProductNo1({
  baseWidth = 300,
  autoplay = true,
  autoplayDelay = 11000,
  pauseOnHover = true,
  loop = true,
  round = false
}) {
  const {
    data: carouselData = [],
    error: carouselError,
    isPending: carouselPending,
    refetch 
  } = useQuery({
    queryKey: ['carousel1'],
    queryFn: GetFromCar1,
    retry: 3,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    const handleOnline = () => refetch();
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [refetch]);

  const items = useMemo(() => {
    return carouselData.flatMap(item =>
      (item.images || []).map((img, i) => ({
        id: `${item.id}-${i}`,
        title: item.title,
        image: img
      }))
    );
  }, [carouselData]);

  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef(null);

  const activeIndex = useMemo(() => {
    if (items.length === 0) return 0;
    if (loop) {
      return (position - 1 + items.length) % items.length;
    }
    return Math.min(position, items.length - 1);
  }, [position, items.length, loop]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1 || isAnimating) return;
    if (pauseOnHover && isHovered) return;

    const timer = setInterval(() => {
      setIsAnimating(true);
      setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length, isAnimating]);

  useEffect(() => {
    const start = loop ? 1 : 0;
    setPosition(start);
    x.set(-start * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }

    const lastClone = itemsForRender.length - 1;
    if (position === lastClone) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
    } else if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
    } else {
      setIsAnimating(false);
    }
  };

  const handleDragStart = () => {
    setIsAnimating(true);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
        ? -1
        : 0;

    if (!direction) {
      setIsAnimating(false);
      return;
    }

    setPosition(prev => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  if (carouselPending || carouselError || items.length === 0) {
    return (
      <div
        className={`relative overflow-hidden flex items-center justify-center ${round ? 'rounded-full border border-white' : 'rounded-[24px] border border-[#222]'}`}
        style={{ width: `${baseWidth}px`, height: round ? `${baseWidth}px` : '165px' }}
      >
        <ImageLoader />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden p-4 ${round ? 'rounded-full border border-white' : 'rounded-[24px] border border-[#222]'}`}
      style={{ width: `${baseWidth}px`, ...(round && { height: `${baseWidth}px` }) }}
    >
      <motion.div
        className="flex"
        drag="x"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x
        }}
      >
        {itemsForRender.map((item, index) => (
          <CarouselProductItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
            isAnimating={isAnimating}
          />
        ))}
      </motion.div>

      <div className="flex w-full justify-center">
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer ${
                activeIndex === index ? (round ? 'bg-white' : 'bg-[#333333]') : (round ? 'bg-[#555]' : 'bg-[rgba(51,51,51,0.4)]')
              }`}
              animate={{ scale: activeIndex === index ? 1.2 : 1 }}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setPosition(loop ? index + 1 : index);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}