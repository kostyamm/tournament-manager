import { useEffect, useState } from 'react';

enum Breakpoint {
    xs = 'xs',
    sm = 'sm',
    md = 'md',
    lg = 'lg',
    xl = 'xl',
}

const breakpoints: { [key in Breakpoint]: number } = {
    [Breakpoint.xs]: 0,
    [Breakpoint.sm]: 640,
    [Breakpoint.md]: 768,
    [Breakpoint.lg]: 1024,
    [Breakpoint.xl]: 1280,
};

export const useBreakpoint = (): { breakpoint?: Breakpoint, isMobile: boolean } => {
    const [breakpoint, setBreakPoint] = useState<Breakpoint>();
    const [windowWidth, setWindowSize] = useState(0);

    const handleResize = () => setWindowSize(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        const { xs, sm, md, lg, xl } = breakpoints

        if (xs < windowWidth && windowWidth <= sm) {
            setBreakPoint(Breakpoint.xs);
        }
        if (sm <= windowWidth && windowWidth <= md) {
            setBreakPoint(Breakpoint.sm);
        }
        if (md <= windowWidth && windowWidth <= lg) {
            setBreakPoint(Breakpoint.md);
        }
        if (lg <= windowWidth && windowWidth <= xl) {
            setBreakPoint(Breakpoint.lg);
        }
        if (windowWidth >= xl) {
            setBreakPoint(Breakpoint.xl);
        }

        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);


    return {
        breakpoint,
        isMobile: breakpoint === Breakpoint.xs || breakpoint === Breakpoint.sm,
    };
};
