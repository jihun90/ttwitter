import { AuthService } from '@/services/firebase/authService';
import { DBService } from '@/services/firebase/dbService';
import { CollectionID, MessageInfo, isCollection } from '@/models/collectionContainer';
import { useState, useEffect, useContext } from 'react';
import Ttweet from '@/components/Ttweet/Ttweet';
import { EdittingProvider } from '@/contexts/EdttingContext';
import { TtweetProvider } from '@/contexts/TtweetContext';
import { AttachmentForm } from '@/components/Ttweet/AttachmentForm';
import { AttachmentContext, AttachmentProvider } from '@/contexts/AttachmentContext';
import { AttachmentPreview } from '@/components/Ttweet/AttachmentPreview';
import { InputProvider, SetTextContext, SetUrlContext, TextContext } from '@/contexts/InputTtweetContext';
import { StorageService } from '@/services/firebase/storageService';

function Home(): React.JSX.Element {
    const [ttweets, setTtweets] = useState<MessageInfo[]>([]);

    useEffect(() => {
        const collection = DBService.GetInstance().Collection[CollectionID.ttweet];
        if (!isCollection(collection)) return;
        collection.onSnapshot([ttweets, setTtweets]);
    }, [ttweets]);

    return (
        <div>
            <InputView />
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

function InputView() {
    return (
        <InputProvider>
            <AttachmentProvider>
                <div>
                    <TextFormView />
                    <AttachmentForm />
                    <AttachmentPreview />
                    <SubmitButton />
                </div>
            </AttachmentProvider>
        </InputProvider>
    );
}

function TextFormView() {
    const ttweet = useContext(TextContext);
    const setTtweet = useContext(SetTextContext);

    const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const value = event.currentTarget?.value;
        if (!value) return;
        setTtweet(value);
    };

    return <input value={ttweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />;
}

function SubmitButton() {
    const ttweet = useContext(TextContext);
    const setTtweet = useContext(SetTextContext);

    const setUrl = useContext(SetUrlContext);
    const attachment = useContext(AttachmentContext);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const user = AuthService.GetInstance().user;
        const uId: string = user?.uid ?? '';

        async () => {
            const url = await getUrl(attachment);
            if (ttweet && url) return;
            if (ttweet === '' && url === '') return;

            const msg: MessageInfo = { text: ttweet, createdAt: Date.now(), createdBy: uId, attachment: url };

            const collection = DBService.GetInstance().Collection[CollectionID.ttweet];
            if (!isCollection(collection)) return;
            collection.set(msg);
            setTtweet('');
            setUrl('');
        };
    };
    return (
        <form onSubmit={onSubmit}>
            <input type="submit" value="ttweet" />
        </form>
    );
}

async function getUrl(attachment: string) {
    if (attachment === '') return;

    const uid = AuthService.GetInstance().user;
    if (!uid) return;

    const result = await StorageService.GetInstance().put(uid.uid, attachment);
    if (!result) return;

    const url = await StorageService.GetInstance().get(result.ref.fullPath);

    if (!url) return;
    return url;
}

export default Home;
