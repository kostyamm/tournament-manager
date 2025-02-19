'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type DialogConfig = {
    title: string;
    description?: string;
} | null

type DialogContextValue = {
    confirmDialog: (config: DialogConfig) => Promise<boolean>;
    closeDialog: () => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState<DialogConfig>(null);
    const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

    const confirmDialog = (newConfig: DialogConfig): Promise<boolean> => {
        return new Promise((resolve) => {
            setIsOpen(true);
            setConfig(newConfig);
            setResolver(() => resolve);
        });
    };

    const closeDialog = () => {
        setIsOpen(false);
        setConfig(null);
        setResolver(null);
    };

    const handleConfirm = () => {
        resolver?.(true);
        closeDialog();
    };

    const handleCancel = () => {
        resolver?.(false);
        closeDialog();
    };

    return (
        <DialogContext.Provider value={{ confirmDialog, closeDialog }}>
            {children}

            <Dialog open={isOpen} onOpenChange={() => setIsOpen((v) => !v)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{config?.title}</DialogTitle>
                        {config?.description && <DialogDescription>{config.description}</DialogDescription>}
                    </DialogHeader>
                    <DialogFooter className="gap-4 mt-2">
                        <Button onClick={handleConfirm}>
                            Confirm
                        </Button>
                        <Button onClick={handleCancel} variant="secondary" >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DialogContext.Provider>
    );
};

export const useDialog = (): DialogContextValue => {
    const context = useContext(DialogContext);

    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }

    return context;
};