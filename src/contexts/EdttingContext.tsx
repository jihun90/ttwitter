import { SetStateAction, createContext, useState } from 'react';

export const EdittingContext = createContext(false);
export const SetEdittingContext = createContext<React.Dispatch<SetStateAction<boolean>>>(() => {
    return;
});

export function EdittingProvider({ children }: { children: React.JSX.Element }): React.JSX.Element {
    const [editting, setEditting] = useState(false);
    return (
        <EdittingContext.Provider value={editting}>
            <SetEdittingContext.Provider value={setEditting}>{children}</SetEdittingContext.Provider>
        </EdittingContext.Provider>
    );
}
