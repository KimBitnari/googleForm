import React, {useState} from "react"
import classNames from 'classnames'
import '../css/Input.css';

const Input = ({ op }) => {
    const [active, setActive] = useState(false);
    const [title, setTitle] = useState(op.title);

    const onTitleChange = (val) => {
        op.title = val
        setTitle(val)
    }

    return <div className="customTextareaWrapper">
        <input type="text" 
            value={title} onChange={e => onTitleChange(e.target.value)}
            className={classNames("customTextarea", {"active": active})}
            onFocus={e => setActive(true)} onBlur={e => setActive(false)} />
        <div className="customTextareaDefaultBottomBorder"></div>
        <div className={classNames("customTextareaBottomBorder", {"active": active})}></div>
    </div>
}

export default Input