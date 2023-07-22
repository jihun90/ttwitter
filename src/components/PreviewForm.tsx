import { useState } from 'react';

export function PreviewForm() {
    const [attachment, setAttachment] = useState('');

    const onClear = () => setAttachment('');
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

    return (
        <form>
            <input type="file" accept="image/*" onChange={onFileChanged} />
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClear}>Clear</button>
                </div>
            )}
        </form>
    );
}
