import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setUserProfile } from '../reducers/user';
import { useHistory } from "react-router-dom";
import {db, firebaseApp, firebase} from '../firebase'
import { IoDocumentText } from 'react-icons/io5';
import '../css/FormList.css';
import FormCard from '../components/FormCard'

const FormList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const jwtToken = useSelector((state) => state.user.userProfile);
    const [firstOfNickName, setFirstOfNickName] = useState("");
    const [forms, setForms] = useState([]);
    const [login, setLogin] = useState([]);

    function result() {
        return new Promise(async (resolve, reject) => {
            const querySnapshot = await db.collection('forms').get();
            const formData = querySnapshot.docs.map(doc => doc.data());
            resolve(formData);
        });
    }

    async function readForms() {
        const fData = await result();
        setForms(fData);
    }

    useEffect(() => {
        if(jwtToken.nickName) {
            const n = jwtToken.nickName;
            setFirstOfNickName(n.substring(0, 1));
            setLogin(<div className="btn" style={{marginLeft:20, cursor:"pointer"}} onClick={() => onLogout()}>로그아웃</div>)
        }
        else {
            setFirstOfNickName("N")
            setLogin(<div className="btn" style={{marginLeft:20, cursor:"pointer"}} onClick={() => history.push('/login')}>로그인</div>)
        }

        readForms();
    },[]);

    const onLogout = async () => {
        await firebaseApp.auth().signOut();
        dispatch(setUserProfile(""));
        history.push('/login');
    }

    const addForm = () => {
        if(jwtToken.nickName) history.push("/form/add");
        else {
            alert("로그인을 해주세요!")
            history.push("/login");
        }
    }

    return <div>
        <div className="topBar">
            <div className=" flex fdr jcsb">
                <div className="flex fdr aic" style={{paddingTop:28, paddingLeft:24,}}>
                    <div style={{width:40, height:40,}}>
                        <IoDocumentText size="40" color="rgb(103, 58, 183)" />
                    </div>
                    <div style={{marginLeft:16,fontSize:24, fontWeight:500}}>
                        구글폼 리스트
                    </div>
                </div>
                <div className="flex fdr aic" style={{paddingTop:28, paddingRight:24,}}>
                    <div className="flex aic jcc circlePurple">{firstOfNickName}</div>
                    {login}
                </div>
            </div>
        </div>
        <div style={{width:800, margin:'20px auto',}}>
            <div className="listBox" style={{backgroundColor:"rgb(208 208 208)"}} onClick={() => addForm()}>폼 만들기</div>
            {
                forms.map((form,index) => {
                    return < FormCard form={form} key={index} />
                })
            }
        </div>
    </div>
}

export default FormList;