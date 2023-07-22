import { MessageInfo } from '@/models/collectionContainer';
import { createContext } from 'react';

export const TtweetContext = createContext<MessageInfo>({ text: '', createdAt: 0, createdBy: '' });

type Prop = {
    ttweet: MessageInfo;
    chidren: React.JSX.Element;
};

export function TtweetProvider({ ttweet, chidren }: Prop) {
    return <TtweetContext.Provider value={ttweet}>{chidren}</TtweetContext.Provider>;
}
