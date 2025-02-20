import { useState } from "react"

export default function Couter() {
    const [couter, setCouter] = useState(0)

    const increaseCountClickHanlder = () => {
        setCouter(couter + 1)
    }

    return (
        <>
            <h2>Couter</h2>
            <div>{couter}</div>
            <button onClick={increaseCountClickHanlder}>+</button>
            <hr />
        </>
    )
}