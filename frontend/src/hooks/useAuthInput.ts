'use client';

import { useState, useEffect } from 'react';

function validateEmailString(email: string) {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
}

interface valuesType {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
}

type FieldType = 'name' | 'email' | 'password' | 'passwordCheck';

//유효성 검사 커스텀 훅
function useInputValidation(
  values: valuesType
): [valuesType, (name: FieldType, value?: string) => boolean] {
  const [errors, setErrors] = useState<valuesType>({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const checkValidation = (name: FieldType, value: string = values[name]): boolean => {
    let msg = '';
    switch (name) {
      case 'name':
        if (value.length === 0) {
          msg = '닉네임을 입력해 주세요';
        } else if (value.length > 15) {
          msg = '닉네임을 15자 이하로 입력해주세요.';
        }
        break;
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

        let msg2 = '';
        if (values['passwordCheck'].length > 0) {
          if (value.length < 8) {
            msg2 = '먼저 조건에 맞는 비밀번호를 입력해주세요';
          } else if (value !== values['passwordCheck']) {
            msg2 = '비밀번호가 일치하지 않습니다';
          }
          setErrors((prevValues: valuesType) => ({
            ...prevValues,
            passwordCheck: msg2,
          }));
        }
        break;
      case 'passwordCheck':
        if (values['password'].length < 8) {
          msg = '먼저 조건에 맞는 비밀번호를 입력해주세요';
        } else if (value !== values['password']) {
          msg = '비밀번호가 일치하지 않습니다';
        }
        break;
    }
    setErrors((prevValues: valuesType) => ({
      ...prevValues,
      [name]: msg,
    }));

    return msg === '';
  };

  return [errors, checkValidation];
}

//입력 폼 커스텀 훅
export function useAuthInput() {
  const [values, setValues] = useState<valuesType>({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [errors, checkValidation] = useInputValidation(values);
  const [isLogInSubmitActive, setLoginSubmitActive] = useState(false);
  const [isSignUpSubmitActive, setSigninSubmitActive] = useState(false);

  //입력칸이 모두(태그 제외) 빈칸이면 등록 버튼 비활성화
  useEffect(() => {
    setLoginSubmitActive(
      values.email !== '' && values.password !== '' && errors.email === '' && errors.password === ''
    );
    setSigninSubmitActive(
      values.name !== '' &&
        values.email !== '' &&
        values.password !== '' &&
        values.passwordCheck !== '' &&
        errors.name === '' &&
        errors.email === '' &&
        errors.password === '' &&
        errors.passwordCheck === ''
    );
  }, [values, errors]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value, //대괄호 표기법 = 문자열
    }));

    //유효성 검사
    checkValidation(name as FieldType, value);
  };

  return {
    values,
    errors,
    isLogInSubmitActive,
    isSignUpSubmitActive,
    onChange,
  };
}
