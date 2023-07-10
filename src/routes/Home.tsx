import { FirebaseObject, ttweetData } from '@/myFirebase';
import { useState, useEffect } from 'react';

function Home(): React.JSX.Element {
    const [ttweet, setTtweet] = useState('');
    const [ttweets, setTtweets] = useState<ttweetData[]>([]);

    useEffect(() => {
        FirebaseObject.GetInstance()
            .DB.getCollection()
            .then((dbTtweets): void => {
                dbTtweets.forEach(dbTtweet => {
                    const data = dbTtweet.data() as ttweetData;
                    data.id = dbTtweet.id;
                    setTtweets(prev => [data, ...prev]);
                });
            })
            .catch((): void => {
                throw Error('DB.getCollection');
            });
    }, []);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        FirebaseObject.GetInstance()
            .DB.setCollection(ttweet)
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
                        <h4>{ttweet.msg}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
