import styles from '@/styles/components/Input.module.scss';

const Input = ({ type = 'title', value = '', onChange = () => {} }) => {
  const typeMap = {
    title: '제목을 입력해주세요',
  };

  const handleChange = (e) => {
    const input = e.target.value;
    onChange(input);
    console.log(input);
  };

  return (
    <div>
      <input
        placeholder={typeMap[type]}
        className={styles.input}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
