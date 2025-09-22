"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/components/SearchInput.module.scss";

import ic_search from "/public/icons/ic_search.svg";

const SearchInput = () => {
  const [value, setValue] = useState("");

  return (
    <div className={styles.input}>
      <Image className={styles.searchIcon} src={ic_search} alt="ic_search" />
      <input
        className={styles.searchInput}
        type="text"
        placeholder="검색할 상품을 입력해주세요"
      />
    </div>
  );
};

export default SearchInput;
