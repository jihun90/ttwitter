import { Firestore, collection, doc, setDoc, DocumentData, getDocs, Query, query } from 'firebase/firestore';
import { CollectionContainer, CollectionID, MessageInfo, isMessageInfo, Prop, Action } from './collectionContainer';

export default abstract class Collection implements CollectionContainer {
    public abstract id: CollectionID;
    private firestore: Firestore = {} as Firestore;

    constructor(firestore: Firestore) {
        this.firestore = firestore;
    }

    set(msg: MessageInfo) {
        const newDoc = doc(collection(this.firestore, 'ttweet'));
        if (!msg.id) {
            msg.id = newDoc.id;
        }
        const promise = setDoc(newDoc, msg);

        let isSucess = false;
        promise
            .then(() => {
                isSucess = true;
            })
            .catch(() => {
                isSucess = false;
            });

        return isSucess;
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

    insertToProp(prop: Prop<MessageInfo[]>): boolean {
        const queryData: Query<DocumentData, DocumentData> = query(collection(this.firestore, this.id));
        const promise = getDocs(queryData);

        let isSucess = false;
        const [state, action] = prop;
        promise
            .then(response => {
                response.forEach(msg => {
                    const doc = msg.data();
                    if (isMessageInfo(doc)) {
                        action([doc, ...state]);
                    }
                });
                isSucess = true;
            })
            .catch(() => {
                isSucess = false;
                Error(`Error : get ${this.id}collection`);
            });

        return isSucess;
    }
}
