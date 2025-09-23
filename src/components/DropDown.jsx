'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import ic_arrowDown from '/public/icons/ic_arrowDown.svg';
import ic_kebab from '/public/icons/ic_kebab.svg';

import styles from '@/styles/components/DropDown.module.scss';

const DropDownSort = ({ type = 'sort' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('recent');
  const sortOptions = ['recent', 'favorite'];
  const modifyOptions = ['edit', 'delete'];

  const labelMap = {
    recent: '최신순',
    favorite: '좋아요순',
    edit: '수정하기',
    delete: '삭제하기',
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  let optionList;
  if (type === 'sort') {
    optionList = sortOptions.map((opt) => (
      <li key={opt} onClick={() => handleSelect(opt)} className={clsx(styles.item, styles[opt])}>
        {labelMap[opt]}
      </li>
    ));
  } else if (type === 'modify') {
    optionList = modifyOptions.map((opt) => (
      <li key={opt} onClick={() => handleSelect(opt)} className={clsx(styles.item, styles[opt])}>
        {labelMap[opt]}
      </li>
    ));
  }

  return (
    <div className={clsx(styles.dropdown, styles[type])}>
      <button onClick={toggle} className={styles.button}>
        {type === 'sort' ? (
          <div className={styles.buttonWrapper}>
            <div className={styles.dropdownText}>{labelMap[selected]}</div>
            <Image src={ic_arrowDown} alt="ic_arrowDown" />
          </div>
        ) : (
          <Image src={ic_kebab} alt="ic_kebab" />
        )}
      </button>
      {isOpen && <ul className={styles.menu}>{optionList}</ul>}
    </div>
  );
};

export default DropDownSort;
