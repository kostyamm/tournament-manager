'use client'

import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    return <NextUIProvider>{children}</NextUIProvider>
}