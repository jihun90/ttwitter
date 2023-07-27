import {
    Firestore,
    collection,
    setDoc,
    DocumentData,
    getDocs,
    Query,
    query,
    onSnapshot,
    doc,
    deleteDoc,
    updateDoc,
    QuerySnapshot,
} from 'firebase/firestore';
import {
    CollectionContainer,
    CollectionID,
    MessageInfo,
    isMessageInfo,
    Prop,
    QuerySnapshotAction,
} from '@/models/collectionContainer';

export default abstract class Collection implements CollectionContainer {
    public abstract id: CollectionID;
    private firestore: Firestore = {} as Firestore;

    constructor(firestore: Firestore) {
        this.firestore = firestore;
    }

    async set(msg: MessageInfo) {
        const newDoc = doc(collection(this.firestore, this.id));
        if (!msg.id) {
            msg.id = newDoc.id;
        }
        return setDoc(newDoc, msg);
    }

    get(): MessageInfo[] {
        const queryData: Query<DocumentData, DocumentData> = query(collection(this.firestore, this.id));
        const promise = getDocs(queryData);

        let state: MessageInfo[] = [];

        promise
            .then(response => {
                response.forEach(msg => {
                    const doc = msg.data();
                    if (isMessageInfo(doc)) {
                        state = [doc, ...state];
                    }
                });
            })
            .catch(() => {
                Error(`Error : get ${this.id}collection`);
            });

        return state;
    }

    appendToProp(prop: Prop<MessageInfo[]>): void {
        const queryData: Query<DocumentData, DocumentData> = query(collection(this.firestore, this.id));
        const promise = getDocs(queryData);

        const [state, action] = prop;
        promise
            .then(response => {
                response.forEach(msg => {
                    const doc = msg.data();
                    if (isMessageInfo(doc)) {
                        action([doc, ...state]);
                    }
                });
            })
            .catch(() => {
                Error(`Error : get ${this.id}collection`);
            });
    }

    onSnapshot(onNext: QuerySnapshotAction): MessageInfo[] {
        const ttweets: MessageInfo[] = [] as MessageInfo[];
        const curCollection = collection(this.firestore, this.id);
        onSnapshot(curCollection, onNext);
        return ttweets;
    }

    async delete(message: MessageInfo) {
        if (!isMessageInfo(message)) return;

        const docToBeDeleted = doc(collection(this.firestore, this.id), message.id);
        return deleteDoc(docToBeDeleted);
    }

    async update(message: MessageInfo): Promise<void> {
        if (!isMessageInfo(message)) return;

        const newDoc = doc(collection(this.firestore, this.id), message.id);
        return updateDoc(newDoc, message);
    }
}

export type { QuerySnapshot, DocumentData };
