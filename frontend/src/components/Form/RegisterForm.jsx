import { useState } from "react";
import BasicButton from "../Atoms/BasicButton";
import LabeledInput from "../Atoms/LabeledInput";
import {
  validateDescription,
  validatePrice,
  validateProductName,
  validateTag,
} from "./vaildator";
import style from "./RegisterForm.module.css";

function RegisterForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [tag, setTag] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    tag: "",
  });

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    setErrors((prev) => ({ ...prev, name: validateProductName(val) }));
  };

  const handleDescriptionChange = (e) => {
    const val = e.target.value;
    setDescription(val);
    setErrors((prev) => ({ ...prev, description: validateDescription(val) }));
  };

  const handlePriceChange = (e) => {
    const val = e.target.value;
    setPrice(val);
    setErrors((prev) => ({ ...prev, price: validatePrice(val) }));
  };

  const handleTagChange = (e) => {
    const val = e.target.value;
    setTag(val);
    setErrors((prev) => ({ ...prev, tag: validateTag(val) }));
  };

  // 버튼 활성화
  const isFormValid = 
    name !== "" &&
    description !== "" &&
    price !== "" &&
    tag !== "" &&
    !errors.name &&
    !errors.description &&
    !errors.price &&
    !errors.tag;;


  return (
    <form className={style.registerForm}>
      <div className={style.head}>
        <h1 className={style.title}>상품 등록하기</h1>
        <BasicButton
          name="등록"
          widthSize="74px"
          heightSize="42px"
          fontSize="16px"
          shape="square"
          isAble={isFormValid}
        />
      </div>
      <LabeledInput
        name="productName"
        label="상품명"
        placeholder="상품명을 입력해주세요."
        value={name}
        onChange={handleNameChange}
        errMessage={errors.name}
        isValid={!errors.name && name !== ""}
      />
      <LabeledInput
        name="description"
        label="상품 소개"
        inputType="textarea"
        placeholder="상품 소개를 입력해주세요."
        value={description}
        onChange={handleDescriptionChange}
        errMessage={errors.description}
        isValid={!errors.description && description !== ""}
      />
      <LabeledInput
        name="price"
        label="판매가격"
        placeholder="판매 가격을 입력해주세요."
        value={price}
        onChange={handlePriceChange}
        errMessage={errors.price}
        isValid={!errors.price && price !== ""}
      />
      <LabeledInput
        name="tag"
        label="태그"
        placeholder="태그를 입력해주세요."
        value={tag}
        onChange={handleTagChange}
        errMessage={errors.tag}
        isValid={!errors.tag}
      />
    </form>
  );
}

export default RegisterForm;
