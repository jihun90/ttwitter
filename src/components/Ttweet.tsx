import { AuthService } from '@/services/firebase/authService';
import DeleteButton from '@/components/DeleteButton';
import React, { useState } from 'react';
import { MessageInfo } from '@/models/collectionContainer';
import UpdateForm from './UpdateForm';

type Prop = {
    ttweetObj: MessageInfo;
};

function Ttweet({ ttweetObj }: Prop): React.JSX.Element {
    const [editting, setEditting] = useState(false);
    const toggleEdtting = () => setEditting(pre => !pre);
    const isOwner: boolean = ttweetObj.createdBy === (AuthService.GetInstance().user?.uid ?? '');

    return (
        <div>
            {editting ? (
                <>
                    <UpdateForm ttweetObj={ttweetObj} />
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
