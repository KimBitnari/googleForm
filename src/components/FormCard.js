import React, { useState, useEffect, useMemo } from 'react';
import {db, firebaseApp, firebase} from '../firebase'
import { useHistory } from "react-router-dom";

export default function FormCard({ form }) {
    const history = useHistory();
    const [countAnswer, setCountAnswer] = useState(0);
    
    function result2() {
        return new Promise(async (resolve, reject) => {
            const querySnapshot = await db.collection('forms').doc(form.uid).collection('answers').get();
            const formData = querySnapshot.docs.map(doc => doc.data());
            resolve(formData.length);
        });
    }

    async function countAnswers() {
        const cData = await result2();
        setCountAnswer(cData);
    }

    useEffect(() => {
        countAnswers();
    },[]);

    return <div className="listBox" onClick={() => {  history.push("/form/"+form.uid); }}>
        <div>{form.title}</div>
        <div style={{marginTop:36, fontSize:12}}>
            <span>현재 응답 수: </span>
            <div className="flex aic jcc circlePurple" style={{margin:"auto",}}>{countAnswer}</div>
        </div>
    </div>
}