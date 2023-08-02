import LogOutButton from '@/components/LogOutButton';
import { AuthService } from '@/services/firebase/authService';
import { useState } from 'react';

function Profile(): React.JSX.Element {
    const auth = AuthService.GetInstance();
    const [displayName, setDisplayName] = useState(auth.user?.displayName ?? auth.user?.email ?? '');
    const [photoURL, setphotoURL] = useState(auth.user?.photoURL ?? '');

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        setDisplayName(event.currentTarget.value);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        auth.UpdateProfile(displayName, photoURL)
            .then(() => {
                console.log('sucess');
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
