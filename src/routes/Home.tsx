import { AuthService } from '@/services/firebase/authService';
import { DBService } from '@/services/firebase/dbService';
import {
    CollectionID,
    MessageInfo,
    isCollection,
    isMessageInfo,
    QuerySnapshotState,
} from '@/models/collectionContainer';
import { useState, useContext, useEffect } from 'react';
import Ttweet from '@/components/Ttweet/Ttweet';
import { EdittingProvider } from '@/contexts/EdttingContext';
import { TtweetProvider } from '@/contexts/TtweetContext';
import { AttachmentForm } from '@/components/Ttweet/AttachmentForm';
import { AttachmentContext, AttachmentProvider, SetattachmentContext } from '@/contexts/AttachmentContext';
import { AttachmentPreview } from '@/components/Ttweet/AttachmentPreview';
import { InputProvider, SetTextContext, TextContext } from '@/contexts/InputTtweetContext';
import { StorageService } from '@/services/firebase/storageService';

function Home(): React.JSX.Element {
    const [ttweets, setTtweets] = useState<MessageInfo[]>([]);

    useEffect(() => {
        const collection = DBService.GetInstance().Collection[CollectionID.ttweet];
        const onNext = (snapShot: QuerySnapshotState) => {
            const messageList: MessageInfo[] = [];
            for (const item of snapShot.docs) {
                const messageInfo = item.data();
                if (isMessageInfo(messageInfo)) {
                    messageList.push(messageInfo);
                }
            }
            setTtweets(messageList);
        };
        collection.onSnapshot(onNext);
    }, []);

    return (
        <div className="container">
            <InputView />
            <div style={{ marginTop: 30 }}>
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
                <div className="factoryInput__container">
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

    return (
        <input
            value={ttweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
            className="factoryInput__input"
        />
    );
}

function SubmitButton() {
    const ttweet = useContext(TextContext);
    const setTtweet = useContext(SetTextContext);

    const setAttachment = useContext(SetattachmentContext);
    const attachment = useContext(AttachmentContext);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const promise = getUrl(attachment);

        void promise.then(url => {
            const user = AuthService.GetInstance().user;
            const uId: string = user?.uid ?? '';

            if (!ttweet && !url) return;
            if (ttweet === '' && url === '') return;

            const msg: MessageInfo = { text: ttweet, createdAt: Date.now(), createdBy: uId, attachment: url };

            const collection = DBService.GetInstance().Collection[CollectionID.ttweet];
            if (!isCollection(collection)) return;
            if (!isMessageInfo(msg)) return;

            collection
                .set(msg)
                .then(() => {
                    setTtweet('');
                    setAttachment('');
                })
                .catch(() => {
                    Error(`Error : set ${msg.id ?? 'unknown'} collection`);
                });
        });
    };
    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <input type="submit" value="ttweet" className="factoryInput__arrow" />
        </form>
    );
}

async function getUrl(attachment: string) {
    if (attachment === '') return '';

    const uid = AuthService.GetInstance().user;
    if (!uid) return '';

    const result = await StorageService.GetInstance().put(uid.uid, attachment);
    if (!result) return '';

    const url = await StorageService.GetInstance().get(result.ref.fullPath);

    if (!url) return '';
    return url;
}

export default Home;
