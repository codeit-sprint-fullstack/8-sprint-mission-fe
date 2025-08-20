import "../styles/Pagination.css";
import arrow_left from "../assets/arrow_left.svg";
import arrow_right from "../assets/arrow_right.svg";
import { useEffect, useRef } from "react";

function Pagination({ pagination, setPagination, fetchProduct, currentPage }) {
  const handleClickButton = (e) => {
    const buttonText = e.currentTarget.textContent;

    if (!buttonText) {
      const buttonValue = e.currentTarget.dataset.value;
      setPagination(buttonValue);
    } else {
      const numberValue = Number(buttonText);
      setPagination(numberValue);
    }
  };

  useEffect(() => {
    if (pagination === null || pagination === undefined) {
      return;
    }

    console.log(`pagination: ${pagination}`);
    console.log(`current page: ${currentPage}`);

    const convertedNumber = Number(pagination);

    if (
      !Number.isNaN(convertedNumber) &&
      pagination !== null &&
      pagination !== ""
    ) {
      console.log(`${convertedNumber}페이지의 정보를 불러옵니다.`);

      if (convertedNumber !== currentPage) {
        fetchProduct({
          page: convertedNumber,
          limit: 10,
          sort: "recent",
          search: "",
        });
      } else {
        console.log("이미 현재 페이지 입니다.");
      }

      setPagination(null);
    } else {
      let targetPage;

      if (pagination === "prev") {
        targetPage = currentPage - 1;

        if (targetPage < 1) {
          targetPage = 1;
        }

        console.log("이전 페이지로 이동");
      } else if (pagination === "next") {
        targetPage = currentPage + 1;

        if (targetPage > 5) {
          targetPage = 5;
        }

        console.log("다음 페이지로 이동");
      } else {
        return;
      }

      if (targetPage !== currentPage) {
        fetchProduct({
          page: targetPage,
          limit: 10,
          sort: "recent",
          search: "",
        });
      }

      setPagination(null);
    }
  }, [pagination, fetchProduct]);

  return (
    <div className="pagination">
      <button onClick={handleClickButton} data-value="prev">
        <img src={arrow_left} alt="arrow_left" />
      </button>

      <button onClick={handleClickButton}>1</button>
      <button onClick={handleClickButton}>2</button>
      <button onClick={handleClickButton}>3</button>
      <button onClick={handleClickButton}>4</button>
      <button onClick={handleClickButton}>5</button>

      <button onClick={handleClickButton} data-value="next">
        <img src={arrow_right} alt="arrow_right" />
      </button>
    </div>
  );
}

export default Pagination;
