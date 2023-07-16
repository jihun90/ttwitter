import { AuthService } from '@/services/firebase/authService';
import { DBService } from '@/services/firebase/dbService';
import { MessageInfo } from '@/models/collection';
import { useState, useEffect } from 'react';

function Home(): React.JSX.Element {
    const [ttweet, setTtweet] = useState('');
    const [ttweets, setTtweets] = useState<MessageInfo[]>([]);
    const getTtweets = () => {
        DBService.GetInstance()
            .getCollection()
            .then((dbTtweets): void => {
                dbTtweets.forEach(dbTtweet => {
                    const data = dbTtweet.data() as MessageInfo;
                    setTtweets(prev => [data, ...prev]);
                });
            })
            .catch((): void => {
                throw Error('DB.getCollection');
            });
    };

    useEffect(() => {
        getTtweets();
    }, []);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const uId: string = AuthService.GetInstance().user?.uid ?? '';

        DBService.GetInstance()
            .setCollection(ttweet, uId)
            .then(() => setTtweet(''))
            .catch((): void => {
                throw Error('DB.setCollection');
            });
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
