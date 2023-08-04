import { SetEdittingContext } from '@/contexts/EdttingContext';
import { CollectionID, MessageInfo } from '@/models/collectionContainer';
import { AuthService } from '@/services/firebase/authService';
import { DBService } from '@/services/firebase/dbService';
import React, { useContext, useState } from 'react';

type Prop = { ttweetObj: MessageInfo };

export default function UpdateForm({ ttweetObj }: Prop) {
    const [newTtweet, setNewTtweet] = useState(ttweetObj.text);
    const setEditting = useContext(SetEdittingContext);

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = event;

        setNewTtweet(value);
    };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userId = AuthService.GetInstance().user?.uid ?? '';
        const ttweet: MessageInfo = { id: ttweetObj.id, text: newTtweet, createdAt: Date.now(), createdBy: userId };
        const promise = DBService.GetInstance().Collection[CollectionID.ttweet].update(ttweet);
        promise.catch(() => {
            Error(`Error : update Message (message if : ${ttweet.id ?? ''})`);
        });
        setEditting(pre => !pre);
    };

    return (
        <form onSubmit={onSubmit} className="container nweetEdit">
            <h4>{ttweetObj.text}</h4>
            <input
                type="text"
                autoFocus
                onChange={onChange}
                placeholder="Edit your ttweet"
                value={newTtweet}
                required
                className="formInput"
            />
            <input type="submit" value="Update ttweett" required className="formBtn" />
        </form>
    );
}
