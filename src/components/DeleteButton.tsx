import { CollectionID, MessageInfo, isCollection } from '@/models/collectionContainer';
import { DBService } from '@/services/firebase/dbService';

type Prop = {
    ttweetobj: MessageInfo;
};

export default function DeleteButton({ ttweetobj }: Prop) {
    function onDeleteClick() {
        const ok = window.confirm('Are you sure you want to delete this ttweet?');
        if (ok) {
            const collection = DBService.GetInstance().Collection[CollectionID.ttweet];
            if (isCollection(collection)) {
                const res = collection.delete(ttweetobj);
                console.log(res);
            }
        }
    }
    return <button onClick={onDeleteClick}>Delete Ttweet</button>;
}
