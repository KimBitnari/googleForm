import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import {db, firebaseApp, firebase} from '../firebase'
import { v4 as uuidv4 } from 'uuid';
import { IoDocumentText, IoTrashOutline } from 'react-icons/io5';
import '../css/FormCreate.css';
import AllQuestionBoard from '../components/AllQuestionBoard'
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Toggle from '../components/Toggle'

const FormCreate = () => {
    const history = useHistory();
    const jwtToken = useSelector((state) => state.user.userProfile);
    const [formTitle, setFormTitle] = useState("Untitled Form");
    const [questions, setQuestions] = useState([]);
    const [firstOfNickName, setFirstOfNickName] = useState("");
    const [toggle, setToggle] = useState(false);

    const addQuestion = () => {
        const cp = [...questions]
        cp.push(createDefaultQuestion())
        setQuestions(cp)
    }

    const createDefaultQuestion = () => {
        return {	
            uuid: uuidv4(),
            title: "제목없는 질문",
            questionType: "text"
        }
    }

    const deleteQuestion = (uuid) => {
        const cp = [...questions]
        const index = cp.findIndex(x => x.uuid === uuid)
        cp.splice(index, 1)
        setQuestions(cp)
    }

    // onQuestionUpdate("title", "1asdf-1skdfja-15bb-381hj", "이렇게 수정하자!")
    // const onQuestionUpdate = (key, uuid, data) => {
    //     const cp = [...questions]
    //     const index = cp.findIndex(x => x.uuid === uuid)
    //     cp[index] = {...cp[index], [key]: data}

    //     // const options = cp[index].options

    //     // options.push({
    //     //     uuid: uuidv4(),
    //     //     text: "default"
    //     // })

    //     setQuestions(cp)
    // }

    useEffect(() => {
        const n = jwtToken.nickName
        setFirstOfNickName(n.substring(0, 1));
    },[]);

    const changToggle = () => {
        setToggle(!toggle);
    }

    const onSubmit = async () => {
        console.log(questions)
        const uid = uuidv4();

        await db.collection('forms').doc(uid).set({
            uid: uid,
            title: formTitle,
            created: firebase.firestore.Timestamp.now().seconds,
        });

        for(var i=0;i<questions.length;i++) {
            await db.collection('forms').doc(uid).collection('questions').doc(questions[i].uuid).set({
                uid: questions[i].uuid,
                title: questions[i].title,
                questionType: questions[i].questionType,
                created: firebase.firestore.Timestamp.now().seconds,
            });

            if(questions[i].questionType !== "text") {
                const opArray = questions[i].options;

                for(var j=0;j<opArray.length;j++) {
                    await db.collection('forms').doc(uid).collection('questions').doc(questions[i].uuid).collection('options').doc(opArray[j].uuid).set({
                        uid: opArray[j].uuid,
                        text: opArray[j].text,
                        no: opArray[j].no,
                        created: firebase.firestore.Timestamp.now().seconds,
                    });
                }
            }
        }

        history.push("/");
        alert("link: https://form.kimblingbling.com/form/" + uid);
    }

    function countQuestions(questions) {
		console.log("현재 존재하는 question 수 : " + questions.filter(question => question.uuid).length);
		return questions.filter(question => question.uuid).length;
	  }

    const queCount = useMemo(() => countQuestions(questions), [questions]);

    return <div>
        <div className="topBar">
            <div className=" flex fdr jcsb">
                <div className="flex fdr aic" style={{paddingTop:16, paddingLeft:16,}}> 
                    <div style={{width:40, height:40, cursor:"pointer"}} onClick={() => {history.push("/form/list");}}>
                        <IoDocumentText size="40" color="rgb(103, 58, 183)" />
                    </div>
                    <div style={{marginLeft:16,}}>
                        <input type="text" value={formTitle} style={{fontSize:18, border:'none'}} onChange={e => setFormTitle(e.target.value)} placeholder="Form title" />
                    </div>
                </div>

                <div className="flex fdr aic" style={{paddingTop:16, paddingRight:16,}}>
                    <div className="btn" style={{marginRight:16, cursor:"pointer"}} onClick={() => onSubmit()}>Send</div>
                    <div className="flex aic jcc circlePurple">{firstOfNickName}</div>
                </div>
            </div>
        </div>
        <div style={{width:800,}} className="cardWrapperTitle">
            <div className="cardTopBar">
                <input type="text" value={formTitle} onChange={e => setFormTitle(e.target.value)} placeholder="Form title" 
                className="customFormTitle"/>
            </div> 
        </div>
        <div style={{width:800, margin:'0 auto',}}>
                {
                    questions.map((question,index) => {
                        return <div className="cardWrapperFinal">
                            <div className="cardLeftBar"></div>
                            <div className="cardWrapper">
                                < AllQuestionBoard question={question} key={index} />
                                <div style={{marginBottom:"20px"}}>
                                    <Toggle active={toggle} setToggle={changToggle} />
                                    <p style={{float:"right", margin:0, fontSize:"14px", borderLeft:"1px solid black", marginLeft:"15px", paddingLeft:"25px"}}>Required</p>
                                    <button style={{float:"right", border:"none", backgroundColor:"inherit", cursor:"pointer"}}><IoTrashOutline size="22px" 
                                    onClick={() => deleteQuestion(question.uuid)}/></button>
                                </div>
                            </div>
                        </div>
                    })
                }
        </div>
        <div>
            <div onClick={() => addQuestion()} className="flex aic jcc circlePurple addBtn">+</div>
        </div>
        <KeyboardEventHandler
            handleKeys={['ctrl+=']}
            onKeyEvent={(key, e) => addQuestion()} />
    </div>
}

export default FormCreate;