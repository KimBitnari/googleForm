import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux'
import Select from 'react-select';
import '../css/AllQuestionBoard.css';
import Input from '../components/Input'
import RadioOptions from '../components/RadioOptions'
import CheckboxOptions from '../components/CheckboxOptions'

const questionClasses = [
    { label: "단답형", value: 1 },
    { label: "객관식 질문", value: 2 },
    { label: "체크박스", value: 3 },
];

export default function AllQuestionBoard({ question }) {
    const [questionType, setQuestionType] = useState(1);
    const [questionOptions, setQuestionOptions] = useState([]);
    
    // const addOption = (type) => {
    //     console.log(options)
    //     const cp = options

    //     if(type == 2) 
    //         cp.push(<div><IoRadioButtonOffOutline /><input type="text" /><div onClick={() => addOption(questionType)}>+</div></div>);
    //     else cp.push(<div><IoSquareOutline /><input type="text" /><div onClick={() => addOption(questionType)}>+</div></div>);

    //     setOptions(cp)
    // }

    function readOption() {
        if(questionType == 1)
            setQuestionOptions(<div className="shortText">단답형 텍스트</div>);
        else if(questionType == 2) {
            question.questionType = "radio";
            setQuestionOptions(<RadioOptions question={question} />)
            //setOptions(<div><IoRadioButtonOffOutline /><input type="text" /><div onClick={() => addOption(questionType)}>+</div></div>);
        }
        else  {
            question.questionType = "checkbox";
            setQuestionOptions(<CheckboxOptions question={question} />)
            //setOptions(<div><IoSquareOutline /><input type="text" /><div onClick={() => addOption(questionType)}>+</div></div>);
        }    
    }

    useEffect(() => {
        readOption();
    },[questionType]);

    return <div>
        <div style={{display: "flex"}}>
            <Input op={question} />
            {/* <input type="text" value={question.title} /> */}
            <div style={{width: "200px"}}>
                <Select options={ questionClasses } defaultValue={{ label: "단답형", value: 1 }} onChange={e => setQuestionType(e.value)} />
            </div>
        </div>
        {questionOptions}
        <hr style={{marginTop: "35px",}} />
    </div>
}