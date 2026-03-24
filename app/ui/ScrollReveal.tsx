"use client";

import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Use specific scroller or default to window
    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    // Create a unique context for this component to avoid global conflicts
    const ctx = gsap.context(() => {
      // Rotation animation - Made smoother with scrub: 1
      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation, opacity: 0 },
        {
          ease: 'power2.out',
          rotate: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=50',
            end: 'top center+=100',
            scrub: 1.2
          }
        }
      );

      const wordElements = el.querySelectorAll<HTMLElement>('.word');

      // Opacity and Transform animation for words
      gsap.fromTo(
        wordElements,
        { 
          opacity: baseOpacity, 
          y: 20,
          willChange: 'opacity, transform, filter' 
        },
        {
          ease: 'power3.out',
          opacity: 1,
          y: 0,
          stagger: 0.03,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=10%',
            end: 'top center',
            scrub: 1.5
          }
        }
      );

      // Blur animation - Refined for clarity
      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.03,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom-=10%',
              end: 'top center',
              scrub: 1.5
            }
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
      <div className={`text-[clamp(1.6rem,4vw,3rem)] leading-normal font-semibold ${textClassName}`}>{splitText}</div>
    </h2>
  );
};

export default ScrollReveal;
