import { MessageInfo } from '@/models/collectionContainer';
import { AuthService } from '@/services/firebase/authService';
import DeleteButton from './DeleteButton';
import { useState } from 'react';

type Prop = {
    ttweetObj: MessageInfo;
};

function Ttweet({ ttweetObj }: Prop): React.JSX.Element {
    const [editting, setEditting] = useState(false);
    const [newTtweet, setNewTtweet] = useState(ttweetObj.text);

    const toggleEdtting = () => setEditting(pre => !pre);

    const isOwner: boolean = ttweetObj.createdBy === (AuthService.GetInstance().user?.uid ?? '');
    return (
        <div>
            {editting ? (
                <>
                    <form>
                        <h4>{ttweetObj.text}</h4>
                        <input value={newTtweet} required />
                    </form>
                    <button onClick={toggleEdtting}>Cancel</button>
                </>
            ) : (
                <>
                    {isOwner && (
                        <div>
                            <h4>{ttweetObj.text}</h4>
                            <DeleteButton ttweetobj={ttweetObj} />
                            <button onClick={toggleEdtting}>Edit Ttweet</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Ttweet;
