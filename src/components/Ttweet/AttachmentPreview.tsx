import { AttachmentContext, SetattachmentContext } from '@/contexts/AttachmentContext';
import { useContext } from 'react';

export function AttachmentPreview() {
    const attachment = useContext(AttachmentContext);
    const setAttachment = useContext(SetattachmentContext);

    if (attachment == '') return <></>;
    const onClear = () => setAttachment('');

    return (
        <>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClear}>Clear</button>
        </>
    );
}
