import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import GradientText from '@/react-bits/GradientText.jsx';
import OrderBtn from './Header-components/OrderBtn.jsx';
import { Link, useLocation } from "react-router-dom";

const CardNav = ({
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  const location = useLocation();

  const forceCloseMenu = () => {
    if (!isExpanded) return;
    
    setIsHamburgerOpen(false);
    setIsExpanded(false);
    
    if (tlRef.current) {
      tlRef.current.pause(0); 
    }
    gsap.set(navRef.current, { height: 60 });
  };

  useEffect(() => {
    forceCloseMenu();
  }, [location.pathname]);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;
        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';
        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;
        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;
        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) { newTl.progress(1); tlRef.current = newTl; }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) { tlRef.current = newTl; }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = i => el => { if (el) cardsRef.current[i] = el; };

  return (
    <div className={`mx-auto card-nav-container mt-5 w-[90%] max-w-[800px] ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height]`} style={{ backgroundColor: baseColor }}>
        
        <div className="card-nav-top h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
          <div 
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none`} 
            onClick={toggleMenu} 
            role="button" 
          >
            <div className={`hamburger-line w-[30px] h-[2px] bg-current transition-all duration-300 ${isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''}`}/>
            <div className={`hamburger-line w-[30px] h-[2px] bg-current transition-all duration-300 ${isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''}`}/>
          </div>

          <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
            <GradientText colors={["#121212", "#4A4A4A", "#a4a4a4ff", "#4A4A4A", "#121212"]} animationSpeed={3} showBorder={false} className="font-bold text-3xl md:text-4xl lg:text-5xl">ROBINO</GradientText>
          </div>
          <OrderBtn />
        </div>

        <div className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'} md:flex-row md:items-end md:gap-[12px]`}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div key={`${item.label}-${idx}`} className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-lg min-w-0 flex-[1_1_auto] h-auto md:h-full" ref={setCardRef(idx)} style={{ backgroundColor: item.bgColor, color: item.textColor }}>
              <div className="nav-card-label font-normal text-[18px] md:text-[22px]">{item.label}</div>
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                {item.links?.map((lnk, i) => (
                  <Link 
                    to={lnk.to} 
                    key={`${lnk.label}-${i}`} 
                    onClick={forceCloseMenu}
                    className="nav-card-link inline-flex items-center gap-[6px] hover:opacity-75 transition-opacity duration-300"
                  >
                    <GoArrowUpRight className="shrink-0" />
                    {lnk.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;