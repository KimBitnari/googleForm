import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux'
import { useParams, useHistory } from "react-router-dom";
import {db, firebaseApp, firebase} from '../firebase'
import { v4 as uuidv4 } from 'uuid';
import { IoDocumentText } from 'react-icons/io5';
import Card from '../components/Card'

const Form = () => {
    const history = useHistory();
    const jwtToken = useSelector((state) => state.user.userProfile);
    const { formId } = useParams();
    const [firstOfNickName, setFirstOfNickName] = useState("");
    const [questions, setQuestions] = useState([]);
    const [forms, setForms] = useState([]);
    const [submitData, setSubmitData] = useState([]);
    const [checkSubmitData, setCheckSubmitData] = useState([]);

    function result2() {
        return new Promise(async (resolve, reject) => {
            const querySnapshot = await db.collection('forms').doc(formId).collection('questions').orderBy('created','asc').get();
            const queData = querySnapshot.docs.map(doc => doc.data());
            resolve(queData);
        });
    }

    async function readQuestions() {
        const qData = await result2();
        setQuestions(qData);
    }

    function result1() {
        return new Promise(async (resolve, reject) => {
            const formRef = db.collection('forms').doc(formId);
			const doc = await formRef.get();
			resolve(doc.data());
        });
    }

    async function readForms() {
        const fData = await result1();
        setForms(fData);
    }

    useEffect(() => {
        if(jwtToken.nickName) {
            const n = jwtToken.nickName
            setFirstOfNickName(n.substring(0, 1));
        }
        else setFirstOfNickName("N")

        readForms();
        readQuestions();
    },[]);

    const onSubmit = async () => {
        console.log(submitData)
        console.log(checkSubmitData)

        const uid = uuidv4();

        var userUid = "";
        if(jwtToken.uid) userUid = jwtToken.uid;
        else userUid = uuidv4();

        await db.collection('forms').doc(formId).collection('answers').doc(userUid).set({
            user: userUid,
            created: firebase.firestore.Timestamp.now().seconds,
        });

        for(var i=0;i<submitData.length;i++) {
            await db.collection('forms').doc(formId).collection('answers').doc(userUid).collection('eachQuestions').doc(submitData[i].uid).set({
                uid: submitData[i].uid,
                answer: submitData[i].answer,
                created: firebase.firestore.Timestamp.now().seconds,
            });
        }

        if(checkSubmitData.length !== 0) {
            const index = checkSubmitData.length - 1
            await db.collection('forms').doc(formId).collection('answers').doc(userUid).collection('eachQuestions').doc(checkSubmitData[index].uid).set({
                uid: checkSubmitData[index].uid,
                answer: checkSubmitData[index].answer,
                created: firebase.firestore.Timestamp.now().seconds,
            });
        }
        
        history.push("/");
    }

    return <div>
        <div className="topBar">
            <div className=" flex fdr jcsb">
                <div className="flex fdr aic" style={{paddingTop:16, paddingLeft:16,}}> 
                    <div style={{width:40, height:40, cursor:"pointer"}} onClick={() => {history.push("/");}}>
                        <IoDocumentText size="40" color="rgb(103, 58, 183)" />
                    </div>
                    <div style={{marginLeft:16,}}>
                        <div style={{fontSize:18, border:'none'}} >{forms.title}</div>
                    </div>
                </div>

                <div className="flex fdr aic" style={{paddingTop:16, paddingRight:16,}}>
                    <div className="flex aic jcc circlePurple">{firstOfNickName}</div>
                </div>
            </div>
        </div>
        <div style={{width:800,}} className="cardWrapperTitle">
            <div className="cardTopBar">
                <div className="customFormTitle" >{forms.title}</div>
            </div> 
        </div>
        <div style={{width:800, margin:'0 auto',}}>
            {
                    questions.map((question,index) => {
                        return <div className="cardWrapperFinal">
                            <div className="cardLeftBar"></div>
                            <div className="cardWrapper">
                                < Card formId={formId} question={question} submitData={submitData} checkSubmitData={checkSubmitData} key={index} />
                            </div>
                        </div>
                    })
            }
            <button onClick={() => onSubmit()} className="btn" style={{marginRight:16, cursor:"pointer"}}>제출</button>
        </div>
    </div>
}

export default Form;