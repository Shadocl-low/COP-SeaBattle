import {useState, useCallback, useEffect} from 'react';

export function useModal(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        console.log(`[useModal] State changed to: ${isOpen}`);
    }, [isOpen]);

    return {
        isOpen,
        open,
        close
    };
}