"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { login, signup } from '@/api/Auth';

export const useAuth = create(
    persist(
        (set, get) => ({
            accessToken: '',
            refreshToken: '',
            user: {},
            logIn: async(body) => {
                const res = await login(body);
                console.log(`타입: ${typeof await login(body)}`)
                if(typeof res === 'string'){return res;}
                const {accessToken, refreshToken, user} = res
                set({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    user: user
                })
                return res;
            },
            signUp: async(body) => {
                const res = await signup(body);
                if(typeof res === 'string'){return res;}
                const {accessToken, refreshToken, user} = res;
                set({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    user: user
                })
                return res;
            },
        }),
        { name: 'auth-storage'}
    )
)

function validateEmailString(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
}

//유효성 검사 커스텀 훅
function useInputValidation(values) {
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        passwordCheck: ''
    });

    const checkValidation = (name, value = values[name]) => {
        let msg = '';
        switch (name) {
            case 'email':
                if (value.length === 0) {
                    msg = '이메일을 입력해 주세요';
                } else if (!validateEmailString(value)) {
                    msg = '잘못된 이메일 형식입니다';
                }
                break;
            case 'password':
                if (value.length === 0) {
                    msg = '비밀번호를 입력해주세요';
                } else if (value.length < 8) {
                    msg = '비밀번호를 8자 이상 입력해주세요';
                }
                break;
            case 'passwordCheck':
                if (values['password'].length < 8) {
                    msg = '먼저 조건에 맞는 비밀번호를 입력해주세요';
                } else if (value!==values['password']) {
                    msg = '비밀번호가 일치하지 않습니다';
                }
                break;
        }
        setErrors((prevValues) => ({
            ...prevValues,
            [name]: msg,
        }));

        return msg === '';
    };

    return [errors, checkValidation];
}

//입력 폼 커스텀 훅
export function useAuthInput() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        passwordCheck: ''
    });
    const [errors, checkValidation] = useInputValidation(values);
    const [isLogInSubmitActive, setLoginSubmitActive] = useState(false);
    const [isSignUpSubmitActive, setSigninSubmitActive] = useState(false);

    //입력칸이 모두(태그 제외) 빈칸이면 등록 버튼 비활성화
    useEffect(() => {
        setLoginSubmitActive(
            values.email !== ''
            && values.password !== ''
            && errors.email === '' 
            && errors.password === '');
        setSigninSubmitActive(
            values.email !== ''
            && values.password !== ''
            && values.passwordCheck !== ''
            && errors.email === '' 
            && errors.password === ''
            && errors.passwordCheck === '');
    }, [values, errors]);

    const onChange = (e) => {
        const { name, value } = e.target;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: value, //대괄호 표기법 = 문자열
        }));

        //유효성 검사
        checkValidation(name, value);
    };

    return { 
        values, 
        errors, 
        isLogInSubmitActive, 
        isSignUpSubmitActive, 
        onChange, 
    };
}
