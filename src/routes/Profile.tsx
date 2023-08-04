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
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    type="text"
                    autoFocus
                    placeholder="Enter Profile"
                    onChange={onChange}
                    value={displayName}
                    required
                    className="formInput"
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <LogOutButton />
        </div>
    );
}
export default Profile;
