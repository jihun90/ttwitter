import { CollectionID, MessageInfo } from '@/models/collectionContainer';
import { AuthService } from '@/services/firebase/authService';
import { DBService } from '@/services/firebase/dbService';
import { StorageService } from '@/services/firebase/storageService';
import { useContext, useEffect, useRef } from 'react';
import { AttachmentContext, SetattachmentContext } from '@/contexts/AttachmentContext';

export function AttachmentForm() {
    const attachment = useContext(AttachmentContext);
    const setAttachment = useContext(SetattachmentContext);
    const imageInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (attachment != '') return;
        if (!imageInput.current?.value) return;

        imageInput.current.value = '';
    }, [attachment]);

    const onFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target?.files;
        if (!files) return;

        const reader: FileReader = new FileReader();

        reader.onloadend = (finishedEvent): void => {
            const image = finishedEvent.target?.result;
            if (typeof image != 'string') return;
            setAttachment(image);
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
            <input type="submit" value="Upload" />
        </form>
    );
}
