import styles from "@/styles/components/Button.module.scss";

const Button = ({ type = "login" }) => {
  const typeMap = {
    login: "로그인",
    write: "글쓰기",
  };

  return <button className={styles.button}>{typeMap[type]}</button>;
};

export default Button;
