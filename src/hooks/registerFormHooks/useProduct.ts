import { useState, useEffect } from 'react';
import { createProduct, uploadImages } from '../../api/ProductService';
import { useRouter } from 'next/navigation';

interface FormValues {
  files: File[];
  name: string;
  description: string;
  price: string;
  tag: string;
  tags: string[];
}

type FormErrorsElement = 'name' | 'description' | 'price' | 'tag';
interface FormErrors {
  name: string;
  description: string;
  price: string;
  tag: string;
}

type checkValidationType = (name: FormErrorsElement, value?: string) => boolean;

//유효성 검사 커스텀 훅
function useInputValidation(values: FormValues): [FormErrors, checkValidationType] {
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    description: '',
    price: '',
    tag: '',
  });

  const checkValidation: checkValidationType = (name, value = values[name]) => {
    let msg = '';
    switch (name) {
      case 'name':
        if (value.length === 0) {
          msg = '상품명을 입력해주세요';
        } else if (value.length > 10) {
          msg = '10자 이내로 입력해주세요';
        }
        break;
      case 'description':
        if (value.length === 0) {
          msg = '상품 소개를 입력해주세요';
        } else if (value.length < 10) {
          msg = '10자 이상 입력해주세요';
        }
        break;
      case 'price':
        if (value.length === 0) {
          msg = '판매 가격을 입력해주세요';
        } else if (value.match(/\D+/g)) {
          msg = '숫자로 입력해주세요';
        }
        break;
      case 'tag':
        if (value.length > 5) {
          msg = '5글자 이내로 입력해주세요';
        }
        break;
      default:
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

interface useProductReturn {
  values: FormValues;
  errors: FormErrors;
  isSubmitActive: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTag: () => void;
  deleteTag: (tag: string) => void;
  register: () => Promise<any>; //any 반환 -> 수정 필요
}

//입력 폼 커스텀 훅
export default function useProduct(): useProductReturn {
  const [values, setValues] = useState<FormValues>({
    files: [],
    name: '',
    description: '',
    price: '',
    tag: '',
    tags: [],
  });
  const [errors, checkValidation] = useInputValidation(values);
  const [isSubmitActive, setSubmitActive] = useState<boolean>(false);

  //입력칸이 모두(태그 제외) 빈칸이면 등록 버튼 비활성화
  useEffect(() => {
    setSubmitActive(values.name !== '' || values.description !== '' || values.price !== '');
  }, [values]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (['name', 'description', 'price', 'tag'].includes(name)) {
    }
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value, //대괄호 표기법 = 문자열
    }));

    //유효성 검사
    checkValidation(name as FormErrorsElement, value); //state가 바로 반영이 안되서 별도로 value를 넣었습니다.
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const fileList = files ? Object.values(files).slice(0, 3) : null; //세 개까지만 등록
    setValues((prevValues) => ({
      ...prevValues,
      [name]: fileList, //대괄호 표기법 = 문자열
    }));
  };

  const addTag = () => {
    if (errors.tag === '' && values.tag.length > 0) {
      const newTags = [...values.tags, values.tag];
      setValues((prevValues) => ({
        ...prevValues,
        tag: '', //태그 Input 초기화
        tags: [...new Set(newTags)], //중복 태그 제거
      }));
    }
  };

  const deleteTag = (tag: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      tags: [...values.tags.filter((e) => e !== tag)], //특정 태그 제거
    }));
  };

  const router = useRouter();

  const register = async () => {
    //등록 시 name, description, price 항목 유효성 검사 후 오류메세지를 띄웁니다.
    //(tags는 등록하지 않아도 통과)
    checkValidation('name');
    checkValidation('description');
    checkValidation('price');

    //하나라도 invalid하면 api 리퀘스트를 보내지 않습니다.
    for (const key in errors) {
      if (errors[key as FormErrorsElement] !== '') return;
    }

    //모두 vailid 하다면 리퀘스트를 보냅니다.
    const RqBody = {
      name: values.name,
      description: values.description,
      price: parseInt(values.price),
      tags: values.tags,
      images: [], //이미지 경로만 저장.
    };

    const res = await createProduct(RqBody);
    if (!res.id) {
      return res;
    }

    //상품 이미지는 forData에 images에 넣습니다.
    const formData = new FormData();
    values.files.forEach((file, index) => {
      formData.append('images[]', file);
    });

    //이미지 업로드 성공 여부는 확인할 방법이 없네요 수정하겠습니다.
    const uploadResult = await uploadImages(formData, res.id);

    return res;
  };

  return { values, errors, isSubmitActive, onChange, onFileChange, addTag, deleteTag, register };
}
