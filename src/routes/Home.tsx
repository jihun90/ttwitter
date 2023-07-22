import { AuthService } from '@/services/firebase/authService';
import { DBService } from '@/services/firebase/dbService';
import { CollectionID, MessageInfo, isCollection } from '@/models/collectionContainer';
import { useState, useEffect, createContext } from 'react';
import Ttweet from '@/components/Ttweet';
import { EdittingProvider } from '@/contexts/EdttingContext';
import { TtweetProvider } from '@/contexts/TtweetContext';

export const TtweetContext = createContext<MessageInfo>({ text: '', createdAt: 0, createdBy: '' });

function Home(): React.JSX.Element {
    const [ttweet, setTtweet] = useState('');
    const [ttweets, setTtweets] = useState<MessageInfo[]>([]);

    useEffect(() => {
        const collection = DBService.GetInstance().Collection[CollectionID.ttweet];
        if (isCollection(collection)) {
            collection.onSnapshot([ttweets, setTtweets]);
        }
    }, [ttweets]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const user = AuthService.GetInstance().user;
        const uId: string = user?.uid ?? '';

        const msg: MessageInfo = { text: ttweet, createdAt: Date.now(), createdBy: uId };
        const collection = DBService.GetInstance().Collection[CollectionID.ttweet];
        if (isCollection(collection)) {
            collection.set(msg);
        }

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
                    <EdittingProvider>
                        <TtweetProvider ttweet={ttweet} chidren={<Ttweet key={ttweet.id} />} />
                    </EdittingProvider>
                ))}
            </div>
        </div>
    );
}

export default Home;
