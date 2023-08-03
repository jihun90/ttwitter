import LogOutButton from '@/components/LogOutButton';
import { AuthService } from '@/services/firebase/authService';
import { useState } from 'react';

type Props = {
    refreshDisplayName: () => void;
};

function Profile({ refreshDisplayName }: Props): React.JSX.Element {
    const auth = AuthService.GetInstance();
    const [displayName, setDisplayName] = useState(auth.user?.displayName ?? auth.user?.email ?? '');
    const [photoURL, setphotoURL] = useState(auth.user?.photoURL ?? ''); //ToDo

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        setDisplayName(event.currentTarget.value);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        auth.UpdateProfile(displayName, photoURL)
            .then(() => {
                if (auth.user) {
                    setDisplayName(auth.user.displayName ?? displayName);
                    refreshDisplayName();
                }
            })
            .catch(() => console.log('fail'));
    };

    //photourl 만들기
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Enter Profile" onChange={onChange} value={displayName} required />
                <input type="submit" value={`Edit Profile`} required />
            </form>
            <LogOutButton />
        </>
    );
}
export default Profile;
