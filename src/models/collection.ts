import {
    Firestore,
    collection,
    setDoc,
    DocumentData,
    getDocs,
    Query,
    query,
    onSnapshot,
    QuerySnapshot,
    doc,
    deleteDoc,
    updateDoc,
} from 'firebase/firestore';
import { CollectionContainer, CollectionID, MessageInfo, isMessageInfo, Prop } from './collectionContainer';

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

    onSnapshot(): MessageInfo[] {
        //onSnapshot 변경될때만 누군가 호출해줌..!
        const curCollection = collection(this.firestore, this.id);
        const ttweetArr: MessageInfo[] = [];
        onSnapshot(curCollection, (snapShot: QuerySnapshot<DocumentData, DocumentData>) => {
            for (const item of snapShot.docs) {
                const messageInfo = item.data();
                if (isMessageInfo(messageInfo)) {
                    ttweetArr.push(messageInfo);
                }
            }
        });
        return ttweetArr;
    }

    delete(message: MessageInfo) {
        if (!isMessageInfo(message)) return;

        const docToBeDeleted = doc(collection(this.firestore, this.id), message.id);
        const promise = deleteDoc(docToBeDeleted);
        promise.catch(() => {
            Error(`Error : delete Message (message if : ${message.id ?? ''})`);
        });
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
