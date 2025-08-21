import { useState, useEffect, useContext } from 'react';
import productApi from '../api/ProductService.js';

import useAsync from '../components/hooks/useAsync.jsx';
import LocaleContext from '../contexts/LocaleContext.js';
import '../styles/registration.css';

import HomeHeader from '../components/HomeHeader.jsx';
import HomeFooter from '../components/HomeFooter.jsx';

import cancleTagImg from '/images/registration/cancle_tag.svg';

function InputForm({label, name, value, handleChange, handleKeyDown = null, placeholder = '', rows=1, validErrorMsg = ''}){
    //textara는 기본적으로 rows={2}로 설정 되어 있다. 
    //input처럼 높이를 맞추려면 rows={1}이 꼭 필요.
    return (
        <div className='inputForm'>
            <label>{label}</label>
            {rows===1 && <input className='inputPlace'
                name={name} 
                value={value} 
                onChange={handleChange} 
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />}
            {rows>1 && <textarea className='inputPlace'
                rows={rows} 
                name={name} 
                value={value} 
                onChange={handleChange} 
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />}
            {validErrorMsg.length>0 && <p className='validErrorMsg'>{validErrorMsg}</p>}
        </div>
    );
}

function SelectedTags({tags}){
    return (
        <div className='selectedTags'>
            {tags.map((e)=>{
                return(
                    <div className='selectedTag'>
                        <p>{e}</p>
                        <button className='cancleBtn'><img src={cancleTagImg}/></button>
                    </div>
                );
            })}
        </div>
    );
}

function Registration({}){

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        tag: '',
        tags: [],
    });

    //valid 오류 메세지를 관리하는 State. 겸사겸사 모든 항목이 valid 한지 체크에도 쓰고 있습니다;;
    //이래도 괜찮은지 모르겠습니다;;
    const [validErrorMsgs, setValidErrorMsgs] = useState({
        name: '',
        description: '',
        price: '',
        tag: '',
    });

    const [tags, setTags] = useState(new Set());

    const handleChange = (e) => {
        const { name , value } = e.target;
        const { message } = checkValidity(name, value);
        
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value, //대괄호 표기법을 쓰는 이유는 문자열이기 때문
        }));

        setValidErrorMsgs((prevValues) => ({
            ...prevValues,
            [name]: message, 
        }));
    }

    //태그 추가에만 대응하는 엔터 이벤트 핸들러... (이름을 뭐라고 지어야 할까요?)
    const handleKeyDown = (e) => {
        const { name , value } = e.target;

        if (e.key === 'Enter' && checkValidity(name, value).result) {
            const newTags = [...values.tags, ('#' + values.tag)];
            setValues((prevValues) => ({
                ...prevValues,
                tag: '',
                tags: [...new Set(newTags)] //중복 태그 제거
            })); 
        }
    };

    const handleRegistration = () => {
        //등록 시 name, description, price 항목 valid 체크 후 오류메세지를 띄웁니다.
        //(tags는 등록하지 않아도 통과)
        setValidErrorMsgs((prevValues) => ({
            ...prevValues,
            name: checkValidity('name', values.name).message, 
            description: checkValidity('description', values.description).message,
            price: checkValidity('price', values.price).message,
        }));

        for(const key in validErrorMsgs){
            //하나라도 Invalid하면 api 리퀘스트를 보내지 않습니다.
            if(validErrorMsgs[key]!=='')return;
        }
        
        //모두 vailid 하다면 리퀘스트를 보냅니다.
        const RqBody = {
            images: [
                "https://example.com/..."
            ],
            tags: values.tags,
            price: values.price,
            description: values.description,
            name: values.name,
        }
        productApi.createProduct(RqBody);
    }

    const checkValidity = (name, value) => {
        switch(name){
            case 'name':
                if(value.length===0){return {
                    result: false,
                    message: '상품명을 입력해주세요'
                }}
                if(value.length>10){return {
                    result: false,
                    message: '10자 이내로 입력해주세요'
                }}
                return {
                    result: true,
                    message: ''
                }
            case 'description':
                if(value.length<10){return {
                    result: false,
                    message: '10자 이상 입력해주세요'
                }}
                return {
                    result: true,
                    message: ''
                }
            case 'price':
                if(value.length===0){return {
                    result: false,
                    message: '판매 가격을 입력해주세요'
                }}
                if(value.match(/\D+/g)){return {
                    result: false,
                    message: '숫자로 입력해주세요'
                }}
                return {
                    result: true,
                    message: ''
                }
            case 'tag':
                //tag는 아무것도 입력 안할 시 valid하지는 않지만 오류 메세지를 출력하고 싶지 않아
                //빈칸으로 두었습니다.
                if(value.length===0){return {
                    result: false,
                    message: ''
                }}
                if(value.length>5){return {
                    result: false,
                    message: '5글자 이내로 입력해주세요'
                }}
                return {
                    result: true,
                    message: ''
                }
            case 'tags':
                break;
        }
    }

    //이번에 배운 사실: 리액트 JSX는 객체를 {}표현식에 넣어도 그대로 출력할 수 없다.
    return (
        <>
            <HomeHeader/>
                <main className="with-header registMain">
                    <div className='wrapper'>
                        <div className='headline'>
                            <h1>상품 등록하기</h1>
                            <button onClick={handleRegistration}>등록</button>
                        </div>
                        <InputForm 
                            label='상품명' 
                            name='name' 
                            value={values.name} 
                            handleChange={handleChange}  
                            placeholder='상품명을 입력해 주세요.'
                            validErrorMsg={validErrorMsgs.name}                    
                        />
                        <InputForm 
                            label='상품 소개' 
                            name='description' 
                            value={values.description} 
                            handleChange={handleChange}
                            placeholder='상품소개를 입력해 주세요.'
                            rows={10}
                            validErrorMsg={validErrorMsgs.description} 
                        />
                        <InputForm 
                            label='판매 가격' 
                            name='price' 
                            value={values.price} 
                            handleChange={handleChange}
                            placeholder='판매 가격을 입력해 주세요.'
                            validErrorMsg={validErrorMsgs.price} 
                        />
                        <InputForm 
                            label='태그' 
                            name='tag' 
                            value={values.tag} 
                            handleChange={handleChange}
                            handleKeyDown={handleKeyDown}
                            placeholder='태그를 입력해 주세요.'
                            validErrorMsg={validErrorMsgs.tag} 
                        />
                        <SelectedTags tags={values.tags}/>
                    </div>
                </main> 
            <HomeFooter />
        </>
    );
}

export default Registration;