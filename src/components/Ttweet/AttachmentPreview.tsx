import { SetStateAction } from 'react';

type Props = {
    attachmentProp: [string, React.Dispatch<SetStateAction<string>>];
};

export function AttachmentPreview({ attachmentProp }: Props) {
    const [attachment, setAttachment] = attachmentProp;
    if (attachment == '') return <></>;
    const onClear = () => setAttachment('');

    return (
        <>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClear}>Clear</button>
        </>
    );
}
