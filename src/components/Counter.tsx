import { useState } from "react";
import * as classes from "./Counter.module.scss";

export const Counter = () => {
    const [count, setCount] = useState(0)
    const increment = () => {
        setCount(prev => prev + 1)
    }
    return (
        <>
            <div>
                <button className={classes.btn} onClick={()=>increment()}> increment </button>
                <div>{count}</div>
            </div>
        </> 
    )
}