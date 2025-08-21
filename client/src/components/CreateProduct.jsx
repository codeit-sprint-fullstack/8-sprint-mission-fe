import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/CreateProduct.module.scss";
import { createProductApi } from "../lib/ProductApi";
import ic_X from "../assets/ic_x.svg";

function CreateProduct() {
  const INIT_VALUE = {
    name: "",
    description: "",
    price: "",
    tags: [],
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState(INIT_VALUE);

  const [tagInput, setTagInput] = useState("");

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.price.trim() !== "" &&
      formData.tags.length > 0
    );
  }, [formData]);

  const formChangeFn = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addTag = (tagToAdd) => {
    const trimmedTag = tagToAdd.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, trimmedTag],
      }));
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const submitButton = async (e) => {
    e.preventDefault();

    try {
      const result = await createProductApi(formData);
      console.log("상품 등록 성공", result);

      setFormData(INIT_VALUE);
      setTagInput("");

      navigate(`/items/${result._id}`);
    } catch (e) {
      console.log("등록 실패", e.message);
      alert("상품 등록에 실패했습니다.");
    }
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter") {
      if (e.nativeEvent.isComposing) return;

      e.preventDefault();
      addTag(tagInput);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>상품 등록하기</div>
        <button
          className={`${styles.createButton} ${
            isFormValid ? styles.active : styles.inactive
          }`}
          onClick={submitButton}
        >
          등록
        </button>
      </div>
      <div className={styles.inputForm}>
        <div className={styles.formDetail}>
          <div className={styles.title}>상품명</div>
          <input
            className={styles.formInput}
            name="name"
            type="text"
            placeholder="상품명을 입력해주세요"
            onChange={formChangeFn}
          />
        </div>
        <div className={styles.formDetail}>
          <div className={styles.title}>상품 소개</div>
          <textarea
            className={`${styles.formInput} ${styles.longInput}`}
            name="description"
            type="text"
            placeholder="상품 소개를 입력해주세요"
            onChange={formChangeFn}
          />
        </div>
        <div className={styles.formDetail}>
          <div className={styles.title}>판매가격</div>
          <input
            className={styles.formInput}
            name="price"
            type="number"
            placeholder="판매 가격을 입력해주세요"
            onChange={formChangeFn}
          />
        </div>
        <div className={styles.formDetail}>
          <div className={styles.title}>태그</div>
          <input
            className={styles.formInput}
            name="tags"
            type="text"
            placeholder="태그를 입력해주세요"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInput}
          />
          <div className={styles.tagList}>
            {formData.tags.map((tag, index) => {
              return (
                <span className={styles.tag} key={index}>
                  {tag}
                  <button
                    className={styles.removeTag}
                    type="button"
                    onClick={() => removeTag(tag)}
                  >
                    <img src={ic_X} alt="ic_X" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
