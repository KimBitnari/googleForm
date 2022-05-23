import React, { useState, useEffect, useMemo } from 'react';
import {db, firebaseApp, firebase} from '../firebase'
import '../css/Option.css';

export default function ReadCheckboxOptions({ formId, question, checkSubmitData }) {
    const [options, setOptions] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);

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

    const handleCheck = (e) => {
        let obj = {}
        obj[e.target.value] = e.target.checked 
        const cp = [...checkedItems]

        if(obj[e.target.value]) {
            cp.push({
                uid: e.target.value
            })
            //console.log(cp)
            setCheckedItems(cp)
        }
        else {
            const index = cp.findIndex(x => x.uid === e.target.value)
            cp.splice(index, 1)
            //console.log(cp)
            setCheckedItems(cp)
        }
    }

    useEffect(() => {
        checkSubmitData.push({
            uid: question.uid,
            answer: checkedItems
        })
        //console.log(checkSubmitData)
    },[checkedItems]);

    return <div>
        {
            options.map((option,index) => {
                return <div key={index}>
                    <input type="checkbox" name={question.uid} value={option.uid} onChange={e => handleCheck(e)} />
                    <label>{option.text}</label>
                </div>
            })
        }
    </div>;
}