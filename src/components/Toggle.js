import React, {useEffect} from 'react';
import classNames from 'classnames';
import '../css/Toggle.css';

const Toggle = ({active, setToggle}) => {
    return <div className={classNames("toggleContainer", {"active":active})} onClick={setToggle} style={{float:"right", marginLeft:"15px"}}>
        <div className={classNames("toggleBar", {"active": active})}></div>  
        <div className={classNames("toggleCircleWrapper", {"active": active})}>
            <div className={classNames("toggleCircle", {"active": active})}></div>  
        </div>
    </div>
}

export default Toggle