import React, { useState, useEffect, useMemo } from 'react';
import ReadRadioOptions from '../components/ReadRadioOptions'
import ReadCheckboxOptions from '../components/ReadCheckboxOptions'

export default function Card({ formId, question, submitData, checkSubmitData }) {
    const [questionOptions, setQuestionOptions] = useState([]);
    const [optionText, setOptionText] = useState("");
    
    const onTextChange = (e) => {
        setOptionText(e.target.value)

        const index = submitData.findIndex(x => x.uid === question.uid)
        if(index != -1) {
            submitData.splice(index, 1)
        }

        submitData.push({
            uid: question.uid,
            answer: e.target.value
        })
    }

    function readOption() {
        if(question.questionType == "radio")
            setQuestionOptions(<ReadRadioOptions formId={formId} question={question} submitData={submitData} />);
        else if(question.questionType == "checkbox") 
            setQuestionOptions(<ReadCheckboxOptions formId={formId} question={question} checkSubmitData={checkSubmitData} />);
        // else 
        //     setQuestionOptions();  
    }

    useEffect(() => {
        readOption();
    },[]);

    return <div>
        <div>{question.title}</div>
        {questionOptions==""? 
            <input type="text" value={optionText} onChange={e => onTextChange(e)} className="shortText" style={{color:"black"}} placeholder="단답형 텍스트" />
        :
        questionOptions
        }
    </div>
}