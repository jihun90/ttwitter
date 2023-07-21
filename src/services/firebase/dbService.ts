import { App } from '@/services/firebase/appService';
import { CollectionDictionary, TtweetCollection } from '@/models/collectionContainer';
import { Firestore, getFirestore } from 'firebase/firestore';

class DBService {
    private static sInstance: DBService;
    private dbService: Firestore;
    // public collection: CollectionContainer;
    private collections: CollectionDictionary = {} as CollectionDictionary;
    constructor() {
        this.dbService = getFirestore(App.GetInstance().app);

        this.collections = {
            ttweet: new TtweetCollection(this.dbService),
        };
    }

    get Collection() {
        return this.collections;
    }

    public static GetInstance(): DBService {
        if (!DBService.sInstance) {
            DBService.sInstance = new DBService();
        }
        return DBService.sInstance;
    }
}

export { DBService };
export type { DocumentSnapshot, DocumentData } from 'firebase/firestore';
