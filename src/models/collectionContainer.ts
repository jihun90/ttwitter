import Collection from './collection';

export type MessageInfo = { id?: string; text: string; createdAt: number; createdBy: string; attachment?: string };
export function isMessageInfo(data: unknown): data is MessageInfo {
    return (data as MessageInfo).id != undefined;
}

export type Action<T> = (value: T) => void;
export type Prop<T> = [T, Action<T>];

export type CollectionDictionary = {
    [id: string]: CollectionContainer;
};

export interface CollectionContainer {
    id: CollectionID;
    set(msg: MessageInfo): void;
    get(): MessageInfo[];
    appendToProp(prop: Prop<MessageInfo[]>): void;
    onSnapshot(): MessageInfo[];
    delete(message: MessageInfo): void;
    update(message: MessageInfo): void;
}

export function isCollection(value: unknown): value is CollectionContainer {
    return (value as CollectionContainer).id in CollectionID;
}

export enum CollectionID {
    ttweet = 'ttweet',
}

export class TtweetCollection extends Collection {
    public id: CollectionID = CollectionID.ttweet;
}
