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

    return <input ref={imageInput} type="file" accept="image/*" onChange={onFileChanged} />;
}
