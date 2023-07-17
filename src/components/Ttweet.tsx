import { MessageInfo } from '@/models/collectionContainer';
import { AuthService } from '@/services/firebase/authService';
import { DBService } from '@/services/firebase/dbService';

type Prop = {
    ttweetObj: MessageInfo;
};

function Ttweet({ ttweetObj }: Prop): React.JSX.Element {
    const isOwner: boolean = ttweetObj.createdBy === (AuthService.GetInstance().user?.uid ?? '');
    return (
        <>
            {isOwner && (
                <div>
                    <h4>{ttweetObj.text}</h4>
                    <button>Delete Ttweet</button>
                    <button>Edit Ttweet</button>
                </div>
            )}
        </>
    );
}

export default Ttweet;
