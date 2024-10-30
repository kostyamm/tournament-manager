import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';

export const UiProvider = ({ children }: { children: ReactNode }) => {
    return <NextUIProvider>{children}</NextUIProvider>
}