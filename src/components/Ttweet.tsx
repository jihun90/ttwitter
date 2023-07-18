import { MessageInfo } from '@/models/collectionContainer';
import { AuthService } from '@/services/firebase/authService';
import DeleteButton from './DeleteButton';

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
                    <DeleteButton ttweetobj={ttweetObj} />
                    <button>Edit Ttweet</button>
                </div>
            )}
        </>
    );
}

export default Ttweet;
