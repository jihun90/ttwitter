import { CollectionID, MessageInfo, isCollection } from '@/models/collectionContainer';
import { DBService } from '@/services/firebase/dbService';
import { StorageService } from '@/services/firebase/storageService';

type Prop = {
    ttweetobj: MessageInfo;
};

export default function DeleteButton({ ttweetobj }: Prop) {
    function onDeleteClick() {
        const ok = window.confirm('Are you sure you want to delete this ttweet?');
        if (ok) {
            const collection = DBService.GetInstance().Collection[CollectionID.ttweet];
            if (isCollection(collection)) {
                const url: string = ttweetobj.attachment ?? '';

                StorageService.GetInstance()
                    .delete(url)
                    .catch(() => Error(`Error : delete Message (message if : ${url ?? 'unknown'})`));

                collection
                    .delete(ttweetobj)
                    .catch(() => Error(`Error : delete Message (message if : ${ttweetobj.id ?? 'unknown'})`));
            }
        }
    }
    return <button onClick={onDeleteClick}>Delete Ttweet</button>;
}
