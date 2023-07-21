import { CollectionID, MessageInfo } from '@/models/collectionContainer';
import { AuthService } from '@/services/firebase/authService';
import DeleteButton from '@/components/DeleteButton';
import React, { useState } from 'react';
import { DBService } from '@/services/firebase/dbService';

type Prop = {
    ttweetObj: MessageInfo;
};

function Ttweet({ ttweetObj }: Prop): React.JSX.Element {
    const [editting, setEditting] = useState(false);
    const [newTtweet, setNewTtweet] = useState(ttweetObj.text);

    const toggleEdtting = () => setEditting(pre => !pre);

    const isOwner: boolean = ttweetObj.createdBy === (AuthService.GetInstance().user?.uid ?? '');
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = event;

        setNewTtweet(value);
    };
    const onSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        const userId = AuthService.GetInstance().user?.uid ?? '';
        const ttweet: MessageInfo = { id: ttweetObj.id, text: newTtweet, createdAt: Date.now(), createdBy: userId };
        DBService.GetInstance().Collection[CollectionID.ttweet].update(ttweet);
    };
    return (
        <div>
            {editting ? (
                <>
                    <form>
                        <h4>{ttweetObj.text}</h4>
                        <input
                            type="text"
                            onChange={onChange}
                            placeholder="Edit your ttweet"
                            value={newTtweet}
                            required
                        />
                        <input type="submit" onSubmit={onSubmit} value="Update ttweett" required />
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
