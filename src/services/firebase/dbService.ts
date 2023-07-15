import {
    Firestore,
    getFirestore,
    collection,
    doc,
    setDoc,
    DocumentData,
    getDocs,
    QuerySnapshot,
    Query,
    query,
} from 'firebase/firestore';
import { App } from '@/services/firebase/appService';
import { CollectionID, MessageInfo } from '@/models/collection';

class DBService {
    private static sInstance: DBService;
    private dbService: Firestore;

    constructor() {
        this.dbService = getFirestore(App.GetInstance().app);
    }

    public static GetInstance(): DBService {
        if (!DBService.sInstance) {
            DBService.sInstance = new DBService();
        }
        return DBService.sInstance;
    }

    async setCollection(text: string, user: string): Promise<void> {
        const newDoc = doc(collection(this.dbService, CollectionID.ttweet));
        const data: MessageInfo = { id: newDoc.id, text: text, createdAt: Date.now(), createdBy: user };
        await setDoc(newDoc, data);
    }

    async getCollection(): Promise<QuerySnapshot<DocumentData, DocumentData>> {
        const queryData: Query<DocumentData, DocumentData> = query(collection(this.dbService, CollectionID.ttweet));
        return await getDocs(queryData);
    }
}

export { DBService };
export type { DocumentSnapshot, DocumentData } from 'firebase/firestore';
