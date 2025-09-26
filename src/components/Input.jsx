import styles from '@/styles/components/Input.module.scss';

const Input = ({ type = 'title', value = '', onChange = () => {} }) => {
  const typeMap = {
    title: '제목을 입력해주세요',
    editComment: '댓글을 수정해주세요',
  };

  const handleChange = (e) => {
    const input = e.target.value;
    onChange(input);
  };

  return (
    <input
      className={styles.input}
      placeholder={typeMap[type]}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Input;
