import React, { useState, useEffect, useMemo } from 'react';
import { IoRadioButtonOffOutline } from 'react-icons/io5';
import '../css/Option.css';

export default function RadioOptions({ question }) {
    const [options, setOptions] = useState([{
        text: "옵션 1",
        uuid: "1"+question.uuid,
        no: 1
    }]);

    const onTextChange = (uuid, data) => {
        const cp = [...options]
        const index = cp.findIndex(x => x.uuid === uuid)
        cp[index] = {...cp[index], text: data}

        setOptions(cp)
    }

    const deleteOptions = (uuid) => {
        const cp = [...options]
        const index = cp.findIndex(x => x.uuid === uuid)
        cp.splice(index, 1)
        setOptions(cp)
    }
    
    const addOptions = () => {
        const cp = [...options]
        cp.push(createDefaultOption())
        setOptions(cp)
    }

    const createDefaultOption = () => {
        return {	
            text: "옵션 "+(options.length+1),
            uuid: (options.length+1)+question.uuid,
            no: (options.length+1)
        }
    }

    useEffect(() => {
        question.options = [...options];
    },[options]);

    return <div>
        <div>
        {
            options.map((option,index) => {
                return <div key={index} style={{marginTop:"10px"}}>
                    <IoRadioButtonOffOutline />
                    <input type="text" value={option.text} onChange={e => onTextChange(option.uuid, e.target.value)} class="optionStyle" />
                    <div onClick={() => deleteOptions(option.uuid)} style={{float:"right", padding:"16px 30px 16px 16px", cursor:"pointer"}}>X</div>
                </div>
            })
        }
        </div>
        <br/>
        <div onClick={() => addOptions()} className="flex aic jcc circlePurple" style={{cursor:"pointer"}}>+</div>
    </div>;
}