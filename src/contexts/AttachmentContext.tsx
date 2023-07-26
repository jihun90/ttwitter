import React, { createContext, useState } from 'react';

export const AttachmentContext = createContext<string>('');
export const SetattachmentContext = createContext<React.Dispatch<React.SetStateAction<string>>>(() => {
    return;
});

export function AttachmentProvider({ children }: { children: React.JSX.Element }): React.JSX.Element {
    const [attachment, setAttachment] = useState('');
    return (
        <AttachmentContext.Provider value={attachment}>
            <SetattachmentContext.Provider value={setAttachment}>{children}</SetattachmentContext.Provider>
        </AttachmentContext.Provider>
    );
}
