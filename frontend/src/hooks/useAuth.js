"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
function useAuth() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        passwordCheck: ''
    });
    const [errors, checkValidation] = useInputValidation(values);
    const [isLoginSubmitActive, setLoginSubmitActive] = useState(false);
    const [isSigninSubmitActive, setSigninSubmitActive] = useState(false);

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
        checkValidation(name, value); //state가 바로 반영이 안되서 별도로 value를 넣었습니다.
    };

    const router = useRouter();

    const login = async () => {
        //등록 시 name, description, price 항목 유효성 검사 후 오류메세지를 띄웁니다.
        //(tags는 등록하지 않아도 통과)
        checkValidation('email');
        checkValidation('password');

        //하나라도 invalid하면 api 리퀘스트를 보내지 않습니다.
        for (const key in errors) {
            if (errors[key] !== '') return;
        }

        //모두 vailid 하다면 리퀘스트를 보냅니다.
        const RqBody = {
            email: values.email,
            password: values.password
        };

        const res = await login(RqBody);

        //리퀘스트에 성공하면 상품 상세 사이트 이동
        if (res) {
            router.push(`/`);
        }
    };

    const signin = async () => {
        //등록 시 name, description, price 항목 유효성 검사 후 오류메세지를 띄웁니다.
        //(tags는 등록하지 않아도 통과)
        checkValidation('email');
        checkValidation('password');
        checkValidation('passwordCheck');

        //하나라도 invalid하면 api 리퀘스트를 보내지 않습니다.
        for (const key in errors) {
            if (errors[key] !== '') return;
        }

        //모두 vailid 하다면 리퀘스트를 보냅니다.
        const RqBody = {
            email: values.email,
            password: values.password,
            passwordCheck: values.passwordCheck
        };

        const res = await login(RqBody);

        //리퀘스트에 성공하면 상품 상세 사이트 이동
        if (res) {
            router.push(`/`);
        }
    };

    return { 
        values, 
        errors, 
        isLoginSubmitActive, 
        isSigninSubmitActive, 
        onChange, 
        login, 
        signin 
    };
}

export default useAuth;
