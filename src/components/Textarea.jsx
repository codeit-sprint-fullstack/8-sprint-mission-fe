'use client';

import clsx from 'clsx';

import styles from '@/styles/components/Textarea.module.scss';

/*
  type: detail | comment
  size: sm | lg
*/
const Textarea = ({ type = 'detail', size = 'lg', value = '', onChange = () => {} }) => {
  const typeMap = {
    detail: '내용을 입력해주세요',
    comment: '댓글을 입력해주세요.',
  };

  const handleChange = (e) => {
    const textValue = e.target.value;
    onChange(textValue);
  };

  return (
    <textarea
      placeholder={typeMap[type]}
      className={clsx(styles.textarea, styles[size])}
      value={value}
      onChange={handleChange}
    ></textarea>
  );
};

export default Textarea;
