import { AuthService } from '@/services/firebase/authService';
import DeleteButton from '@/components/DeleteButton';
import React, { useContext } from 'react';
import UpdateForm from './UpdateForm';
import { TtweetContext } from '@/routes/Home';
import { EdittingContext, SetEdittingContext } from '@/contexts/EdttingContext';

function Ttweet() {
    const ttweet = useContext(TtweetContext);
    const editting = useContext(EdittingContext);
    const setEditting = useContext(SetEdittingContext);
    const toggleEdtting = () => setEditting(pre => !pre);

    const isOwner: boolean = ttweet.createdBy === (AuthService.GetInstance().user?.uid ?? '');
    if (isOwner) return <></>;

    const UpdateView = () => {
        return (
            <>
                <UpdateForm ttweetObj={ttweet} />
                <button onClick={toggleEdtting}>Cancel</button>
            </>
        );
    };

    const DefualtView = () => {
        return (
            <>
                <h4>{ttweet.text}</h4>
                <DeleteButton ttweetobj={ttweet} />
                <button onClick={toggleEdtting}>Edit Ttweet</button>
            </>
        );
    };

    return <div>{editting ? <UpdateView /> : <DefualtView />}</div>;
}

export default Ttweet;
