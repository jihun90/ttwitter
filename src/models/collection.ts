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
import { ref } from 'firebase/storage';

export default abstract class Collection implements CollectionContainer {
    public abstract id: CollectionID;
    private firestore: Firestore = {} as Firestore;

    constructor(firestore: Firestore) {
        this.firestore = firestore;
    }

    set(msg: MessageInfo) {
        const newDoc = doc(collection(this.firestore, this.id));
        if (!msg.id) {
            msg.id = newDoc.id;
        }
        const promise = setDoc(newDoc, msg);

        promise.catch(() => {
            Error(`Error : set ${this.id} collection`);
        });
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

    update(message: MessageInfo): void {
        if (!isMessageInfo(message)) return;

        const newDoc = doc(collection(this.firestore, this.id), message.id);
        const promise = updateDoc(newDoc, message);
        promise.catch(() => {
            Error(`Error : update Message (message if : ${message.id ?? ''})`);
        });
    }
}

export type { QuerySnapshot, DocumentData };
