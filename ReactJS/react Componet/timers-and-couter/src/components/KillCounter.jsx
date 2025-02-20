import { useState } from "react";

export default function KillCounter() {
    const [count, setCount] = useState(0);

    const isMax = count >= 10;

    const increaseCountClickHanlder = () => {
        setCount(count + 1);
    }
    const decrementCountClickHandler =()=>{
        setCount(count-1)
    }


    if (count > 10) {
        return (
            <>
                <h1>Game Over!</h1>
                <hr />
            </>
        )
    }

    let titleElement = <h2>Kill Counter</h2>;
    if (count == 1) {
        titleElement = <h1>First Blood!</h1>;
    }

    switch (count) {
        case 2:
            titleElement = <h6>Double Kill</h6>;
            break;
        case 3:
            titleElement = <h4>Tripple Kill</h4>;
            break;
        case 4:
            titleElement = <h3>Multi Kill</h3>;
            break;
        case 5:
            titleElement = <h2>Unstoppable</h2>;
            break;
        case 6:
            titleElement = <h2>GodLike</h2>;
            break;
    }

    return (
        <>
            {titleElement}
            <div>{count}</div>
            <button onClick={increaseCountClickHanlder}>+</button>
            {count>6
            ? <button onClick={decrementCountClickHandler}>-</button>
            : <p>No decrement yet!</p>
            }

            {isMax && <p>Watch Out!</p>}
            <hr />
        </>
    );
}
