import { FirebaseStorage, getStorage, ref, uploadString } from 'firebase/storage';
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

    put(uid: string, srcProp: Prop<string>) {
        const [srcImage, setSrcImage] = srcProp;
        const reference = ref(this.storageService, `${uid}/${uuidv4()}`);
        console.log(reference);
        const promise = uploadString(reference, srcImage, 'data_url');
        promise
            .then(() => setSrcImage(''))
            .catch(() => {
                throw Error(`can not upload Image ${srcImage}`);
            });
    }
}

export { StorageService };
