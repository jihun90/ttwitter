import { AttachmentContext, SetattachmentContext } from '@/contexts/AttachmentContext';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';

export function AttachmentPreview() {
    const attachment = useContext(AttachmentContext);
    const setAttachment = useContext(SetattachmentContext);

    if (attachment == '') return <></>;
    const onClear = () => setAttachment('');

    return (
        <div className="factoryForm__attachment">
            <img
                src={attachment}
                style={{
                    backgroundImage: attachment,
                }}
            />
            <div className="factoryForm__clear" onClick={onClear}>
                <span>Remove</span>
                <FontAwesomeIcon icon={faTimes} />
            </div>
        </div>
    );
}
