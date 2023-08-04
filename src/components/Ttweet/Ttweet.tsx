import { AuthService } from '@/services/firebase/authService';
import DeleteButton from '@/components/Ttweet/DeleteButton';
import React, { useContext } from 'react';
import UpdateForm from '@/components/Ttweet/UpdateForm';
import { EdittingContext, SetEdittingContext } from '@/contexts/EdttingContext';
import { TtweetContext } from '@/contexts/TtweetContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

function Ttweet() {
    const ttweet = useContext(TtweetContext);
    const editting = useContext(EdittingContext);

    const isOwner: boolean = ttweet.createdBy === (AuthService.GetInstance().user?.uid ?? '');
    if (!isOwner) return <></>;

    const UpdateView = () => {
        return (
            <>
                <UpdateForm ttweetObj={ttweet} />
                <CancelButton />
            </>
        );
    };

    const DefualtView = () => {
        return (
            <>
                {ttweet.attachment && <img src={ttweet.attachment} />}
                {ttweet.text && <h4>{ttweet.text}</h4>}
                <div className="nweet__actions">
                    <DeleteButton ttweetobj={ttweet} />
                    <EditToggleButton />
                </div>
            </>
        );
    };

    return <div className="nweet">{editting ? <UpdateView /> : <DefualtView />}</div>;
}

function CancelButton(): React.JSX.Element {
    const setEditting = useContext(SetEdittingContext);
    const toggleEdtting = () => setEditting(pre => !pre);
    return (
        <span onClick={toggleEdtting} className="formBtn cancelBtn">
            Cancel
        </span>
    );
}

function EditToggleButton(): React.JSX.Element {
    const setEditting = useContext(SetEdittingContext);
    const toggleEdtting = () => setEditting(pre => !pre);
    return (
        <span onClick={toggleEdtting}>
            <FontAwesomeIcon icon={faPencilAlt} />
        </span>
    );
}

export default Ttweet;
