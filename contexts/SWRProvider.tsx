'use client'

import { ReactNode } from 'react';
import { SWRConfig, SWRConfiguration } from 'swr';

export const SWRProvider = ({ children, value }: { children: ReactNode, value: SWRConfiguration }) => {
    return <SWRConfig value={value}>{children}</SWRConfig>;
}