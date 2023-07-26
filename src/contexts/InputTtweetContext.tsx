import React, { createContext, useState } from 'react';

export const TextContext = createContext<string>('');
export const SetTextContext = createContext<React.Dispatch<React.SetStateAction<string>>>(() => {
    return;
});
export const UrlContext = createContext<string>('');
export const SetUrlContext = createContext<React.Dispatch<React.SetStateAction<string>>>(() => {
    return;
});

export function InputProvider({ children }: { children: React.JSX.Element }): React.JSX.Element {
    const [text, setText] = useState('');
    const [url, setUrl] = useState('');
    return (
        <TextContext.Provider value={text}>
            <UrlContext.Provider value={url}>
                <SetTextContext.Provider value={setText}>
                    <SetUrlContext.Provider value={setUrl}>{children}</SetUrlContext.Provider>
                </SetTextContext.Provider>
            </UrlContext.Provider>
        </TextContext.Provider>
    );
}
