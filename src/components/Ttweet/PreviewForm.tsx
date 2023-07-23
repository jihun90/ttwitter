import { CollectionID, MessageInfo } from '@/models/collectionContainer';
import { AuthService } from '@/services/firebase/authService';
import { DBService } from '@/services/firebase/dbService';
import { StorageService } from '@/services/firebase/storageService';
import { useEffect, useRef, useState } from 'react';

export function PreviewForm() {
    const [attachment, setAttachment] = useState('');
    const imageInput = useRef<HTMLInputElement>(null);
    const onClear = () => setAttachment('');

    useEffect(() => {
        if (attachment != '') return;
        if (imageInput.current?.value) {
            imageInput.current.value = '';
        }
    }, [attachment]);

    const onFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target?.files;
        if (!files) return;

        const reader: FileReader = new FileReader();
        reader.onloadend = (finishedEvent): void => {
            const image = finishedEvent.target?.result;
            if (typeof image === 'string') {
                setAttachment(image);
            }
        };
        reader.readAsDataURL(files[0]);
    };

    function onUpload(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        async () => {
            if (attachment === '') return;

            const uid = AuthService.GetInstance().user;
            if (!uid) return;

            const result = await StorageService.GetInstance().put(uid.uid, attachment);
            if (!result) return;

            const url = await StorageService.GetInstance().get(result.ref.fullPath);

            const msg: MessageInfo = { text: '', createdAt: 0, createdBy: '', attachment: url };
            const collection = DBService.GetInstance().Collection[CollectionID.ttweet];
            collection.set(msg);
        };
    }

    return (
        <form onSubmit={onUpload}>
            <input ref={imageInput} type="file" accept="image/*" onChange={onFileChanged} />
            {attachment != '' && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClear}>Clear</button>
                </div>
            )}
            <input type="submit" value="Upload" />
        </form>
    );
}
