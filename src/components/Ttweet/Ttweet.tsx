import { AuthService } from '@/services/firebase/authService';
import DeleteButton from '@/components/Ttweet/DeleteButton';
import React, { useContext } from 'react';
import UpdateForm from '@/components/Ttweet/UpdateForm';
import { EdittingContext, SetEdittingContext } from '@/contexts/EdttingContext';
import { TtweetContext } from '@/contexts/TtweetContext';

function Ttweet() {
    const ttweet = useContext(TtweetContext);
    const editting = useContext(EdittingContext);

    const isOwner: boolean = ttweet.createdBy === (AuthService.GetInstance().user?.uid ?? '');
    if (!isOwner) return <></>;

    const UpdateView = () => {
        return (
            <>
                <UpdateForm ttweetObj={ttweet} />
                <ToggleEdittingButton message="Cancel" />
            </>
        );
    };

    const DefualtView = () => {
        return (
            <>
                <h4>{ttweet.text}</h4>
                <DeleteButton ttweetobj={ttweet} />
                <ToggleEdittingButton message="Edit Ttweet" />
            </>
        );
    };

    return <div>{editting ? <UpdateView /> : <DefualtView />}</div>;
}

function ToggleEdittingButton({ message }: { message: string }): React.JSX.Element {
    const setEditting = useContext(SetEdittingContext);
    const toggleEdtting = () => setEditting(pre => !pre);
    return <button onClick={toggleEdtting}>{message}</button>;
}

export default Ttweet;
