import { ReactNode } from 'react';

export const HeaderWrapper = ({ children }: { children: ReactNode }) => (
    <nav className="h-[64px] border-b">
        <header className="h-full mx-auto w-full max-w-[1280px] px-4 md:px-6 flex items-center justify-between">
            {children}
        </header>
    </nav>
);