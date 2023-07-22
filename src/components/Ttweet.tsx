import { AuthService } from '@/services/firebase/authService';
import DeleteButton from '@/components/DeleteButton';
import React, { useContext } from 'react';
import UpdateForm from './UpdateForm';
import { TtweetContext } from '@/routes/Home';
import { EdittingContext, SetEdittingContext } from '@/contexts/EdttingContext';

function Ttweet() {
    const ttweet = useContext(TtweetContext);
    const editting = useContext(EdittingContext);

    const isOwner: boolean = ttweet.createdBy === (AuthService.GetInstance().user?.uid ?? '');
    if (isOwner) return <></>;

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
