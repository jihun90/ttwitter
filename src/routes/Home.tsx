import { AuthService } from '@/services/firebase/authService';
import { DBService } from '@/services/firebase/dbService';
import { CollectionID, MessageInfo } from '@/models/collectionContainer';
import { useState, useEffect } from 'react';

function Home(): React.JSX.Element {
    const [ttweet, setTtweet] = useState('');
    const [ttweets, setTtweets] = useState<MessageInfo[]>([]);
    const getTtweets = () => {
        const isSucess = DBService.GetInstance().getCollection(CollectionID.ttweet).insertToProp([ttweets, setTtweets]);

        // setTtweets(prev => (msg));
    };

    useEffect(() => {
        getTtweets();
    }, []);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const user = AuthService.GetInstance().user;
        const uId: string = user?.uid ?? '';

        const msg: MessageInfo = { text: ttweet, createdAt: Date.now(), createdBy: uId };
        DBService.GetInstance().getCollection(CollectionID.ttweet).set(msg);
        setTtweet('');
    };

    const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const {
            currentTarget: { value },
        } = event;
        setTtweet(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={ttweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="ttweet" />
            </form>
            <div>
                {ttweets.map(ttweet => (
                    <div key={ttweet.id}>
                        <h4>{ttweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
