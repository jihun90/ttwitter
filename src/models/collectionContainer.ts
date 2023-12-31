import Collection, { QuerySnapshot, DocumentData } from '@/models/collection';

export type MessageInfo = { id?: string; text: string; createdAt: number; createdBy: string; attachment?: string };
export function isMessageInfo(data: unknown): data is MessageInfo {
    return (data as MessageInfo).createdBy != undefined;
}

export type Action<T> = (value: T) => void;
export type Prop<T> = [T, Action<T>];
export type QuerySnapshotState = QuerySnapshot<DocumentData, DocumentData>;
export type QuerySnapshotAction = Action<QuerySnapshot<DocumentData, DocumentData>>;

export type CollectionDictionary = {
    [id: string]: CollectionContainer;
};

export interface CollectionContainer {
    id: CollectionID;
    set(msg: MessageInfo): Promise<void>;
    get(): MessageInfo[];
    appendToProp(prop: Prop<MessageInfo[]>): void;
    onSnapshot(onNext: QuerySnapshotAction): MessageInfo[];
    delete(message: MessageInfo): Promise<void>;
    update(message: MessageInfo): Promise<void>;
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
