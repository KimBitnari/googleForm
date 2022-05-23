import React, { useState, useEffect, useMemo } from 'react';
import {db, firebaseApp, firebase} from '../firebase'
import '../css/Option.css';

export default function ReadRadioOptions({ formId, question, submitData }) {
    const [options, setOptions] = useState([]);

    function result() {
        return new Promise(async (resolve, reject) => {
            const querySnapshot = await db.collection('forms').doc(formId).collection('questions').doc(question.uid).collection('options').get();
            const optionData = querySnapshot.docs.map(doc => doc.data());
            resolve(optionData);
        });
    }

    async function readOptions() {
        const oData = await result();
        setOptions(oData);
    }

    useEffect(() => {
        readOptions();
    },[]);

    const handleRadio = (e) => {
        let obj = {}
        obj[e.target.value] = e.target.checked 
        
        const index = submitData.findIndex(x => x.uid === question.uid)
        if(index != -1) {
            submitData.splice(index, 1)
        }

        submitData.push({
            uid: question.uid,
            answer: e.target.value
        })
    }

    return <div>
        {
            options.map((option,index) => {
                return <div key={index}>
                    <input type="radio" name={question.uid} value={option.uid} onChange={e => handleRadio(e)} />
                    <label>{option.text}</label>
                </div>
            })
        }
    </div>;
}