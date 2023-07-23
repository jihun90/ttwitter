import { AuthService } from '@/services/firebase/authService';
import { DBService } from '@/services/firebase/dbService';
import { CollectionID, MessageInfo, isCollection } from '@/models/collectionContainer';
import { useState, useEffect, createContext } from 'react';
import Ttweet from '@/components/Ttweet/Ttweet';
import { EdittingProvider } from '@/contexts/EdttingContext';
import { TtweetProvider } from '@/contexts/TtweetContext';
import { AttachmentForm } from '@/components/Ttweet/AttachmentForm';
import { AttachmentProvider } from '@/contexts/AttachmentContext';
import { AttachmentPreview } from '@/components/Ttweet/AttachmentPreview';

export const TtweetContext = createContext<MessageInfo>({ text: '', createdAt: 0, createdBy: '' });

function Home(): React.JSX.Element {
    const [ttweets, setTtweets] = useState<MessageInfo[]>([]);

    useEffect(() => {
        const collection = DBService.GetInstance().Collection[CollectionID.ttweet];
        if (!isCollection(collection)) return;
        collection.onSnapshot([ttweets, setTtweets]);
    }, [ttweets]);

    return (
        <div>
            <InputFormView />
            <AttachmentView />
            <div>
                {ttweets.map(ttweet => (
                    <EdittingProvider key={ttweet.id}>
                        <TtweetProvider key={ttweet.id} ttweet={ttweet} chidren={<Ttweet key={ttweet.id} />} />
                    </EdittingProvider>
                ))}
            </div>
        </div>
    );
}

function AttachmentView() {
    return (
        <AttachmentProvider>
            <div>
                <AttachmentPreview />
                <AttachmentForm />
            </div>
        </AttachmentProvider>
    );
}

function InputFormView() {
    const [ttweet, setTtweet] = useState('');
    const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const user = AuthService.GetInstance().user;
        const uId: string = user?.uid ?? '';

        const msg: MessageInfo = { text: ttweet, createdAt: Date.now(), createdBy: uId };
        const collection = DBService.GetInstance().Collection[CollectionID.ttweet];
        if (!isCollection(collection)) return;
        collection.set(msg);
        setTtweet('');
    };

    const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const value = event.currentTarget?.value;
        if (!value) return;
        setTtweet(value);
    };

    return (
        <form onSubmit={onSubmit}>
            <input value={ttweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="submit" value="ttweet" />
        </form>
    );
}

export default Home;
