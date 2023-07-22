import { CollectionID, MessageInfo } from '@/models/collectionContainer';
import { AuthService } from '@/services/firebase/authService';
import { DBService } from '@/services/firebase/dbService';
import React, { useState } from 'react';

type Prop = { ttweetObj: MessageInfo };

export default function UpdateForm({ ttweetObj }: Prop) {
    const [newTtweet, setNewTtweet] = useState(ttweetObj.text);

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
        DBService.GetInstance().Collection[CollectionID.ttweet].update(ttweet);
    };

    return (
        <form onSubmit={onSubmit}>
            <h4>{ttweetObj.text}</h4>
            <input type="text" onChange={onChange} placeholder="Edit your ttweet" value={newTtweet} required />
            <input type="submit" value="Update ttweett" required />
        </form>
    );
}
