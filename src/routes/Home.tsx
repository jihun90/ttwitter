import { useState } from "react";

function Home(): React.JSX.Element {
    const [ttweet, setTtweet] = useState("");
    const onSubmit = (event: React.FormEvent<HTMLInputElement>): void => {
        event.preventDefault();
    };

const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const {
            currentTarget: { value },
        } = event;
        setTtweet(value);
    };

    return (
        <div>
            <form>
                <input value={ttweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input onSubmit={onSubmit} type="submit" value="ttweet" />
            </form>
        </div>
    );
}

export default Home;
