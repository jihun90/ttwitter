import { HTMLInputTypeAttribute, ReactNode, SetStateAction } from 'react';

type State = string;
type Dispatch = React.Dispatch<SetStateAction<string>>;

type InputComponentProps = {
    inputType: HTMLInputTypeAttribute;
    state: State;
    dispatch: Dispatch;
};

function AuthInput({ inputType, state, dispatch }: InputComponentProps): ReactNode {
    function onChange(event: React.FormEvent<HTMLInputElement>): void {
        if (!dispatch || dispatch === null) throw new Error('Cannot find InputTypeDispatchProvider');
        dispatch(event.currentTarget.value);
    }

    return (
        <input
            name={inputType}
            type={inputType}
            placeholder={inputType}
            required
            value={state}
            onChange={onChange}
            className="authInput"
        />
    );
}

export default AuthInput;
