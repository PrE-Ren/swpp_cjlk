import {take, put, call, fork} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'

export function* watchLogin(){
    while(true)
    {
        const data = yield take(actions.LOGIN_REQUEST)
        yield call(sendLoginReq, data)
    }
}

export function* watchSignup(){
    while(true)
    {
        const data = yield take(actions.SIGNUP_REQUEST)
        yield call(sendSignupReq, data)
    }
}

export function* sendLoginReq(data){
    let uid = data.userid
    let upw = data.password
    const url = 'http://127.0.0.1:8000/get_auth_token/'
    const url2 = 'http://127.0.0.1:8000/sign_up/'
    const info = JSON.stringify({ username: uid, password: upw });
    const response = yield call(fetch,url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: info,
    })
    if(response.ok) {
        const response2 = yield call(fetch,url2,{
            method: 'GET'
        })
        const response2_data = yield call([response2, response2.json]);
        for(var i in response2_data)
        {
            if(response2_data[i].username == uid)
            {
                const user_data = response2_data[i]
                if(user_data.mySNU_verified)
                    yield put(actions.loginSuccess(uid,upw,user_data))
                else
                    alert("인증되지 않은 사용자입니다. 메일 인증을 하십시오.")
                break;
            }
        }
    } else {
        alert("존재하지 않는 ID나 비밀번호입니다.")
    }
}


export function* sendSignupReq(data){
    let uid = data.userid
    let upw = data.password
    let name = data.name
    let email = data.email
    const url = 'http://127.0.0.1:8000/sign_up/'
    const info = JSON.stringify({ username: uid, password: upw, name: name, email: email });
    const response = yield call(fetch, url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: info,
    });
    if(response.ok) {
        alert("인증 링크가 당신의 SNU 메일로 전송되었습니다.")
        yield put(actions.signupSuccess())
        window.location.href = "/login"
    } else {
        alert("회원가입 실패 : 정보를 바르게 입력하세요.")
    }
}

export default function* () {
    yield fork(watchLogin)
    yield fork(watchSignup)
}