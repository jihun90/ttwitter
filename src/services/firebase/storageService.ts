import { FirebaseStorage, getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { App } from './appService';
import { v4 as uuidv4 } from 'uuid';

export type Action<T> = (value: T) => void;
export type Prop<T> = [T, Action<T>];

class StorageService {
    private storageService: FirebaseStorage;
    private static sInstance: StorageService;

    constructor() {
        this.storageService = getStorage(App.GetInstance().app);
    }
    public static GetInstance(): StorageService {
        if (!StorageService.sInstance) {
            StorageService.sInstance = new StorageService();
        }
        return StorageService.sInstance;
    }

    async put(uid: string, srcImage: string) {
        const reference = ref(this.storageService, `${uid}/${uuidv4()}`);
        return uploadString(reference, srcImage, 'data_url');
    }

    async get(url: string) {
        const reference = ref(this.storageService, url);
        return await getDownloadURL(reference);
    }
}

export { StorageService };
