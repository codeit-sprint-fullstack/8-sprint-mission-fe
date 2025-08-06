import style from './PageButton.module.scss';
import ic_arrow_left from './ic_arrow_left.svg';

function PageButton({ nowPage = 1, buttonLength = 5, pageSize = 10, totalCount = 50, onChange = null }) {
    const startPage = Math.floor((nowPage - 1) / buttonLength) * buttonLength + 1;
    const maxPage = Math.ceil(totalCount / pageSize);

    const pages = Array.from({ length: buttonLength }, (_, i) => startPage + i)
        .filter(pageNum => pageNum <= maxPage);

    return (
        <div className={style.PageButtons}>
            <button
                onClick={() => onChange?.(nowPage - 1)}
                disabled={nowPage <= 1}
            >
                <img src={ic_arrow_left} />
            </button>

            {pages.map((pageNum) => {
                const isCurrent = nowPage === pageNum;
                return (
                    <button
                        key={`page-${pageNum}`}
                        onClick={isCurrent ? undefined : () => onChange?.(pageNum)}
                        className={`${style.pageBtn} ${isCurrent ? style.selected : ''}`}
                    >
                        {pageNum}
                    </button>
                );
            })}

            <button
                onClick={() => onChange?.(nowPage + 1)}
                disabled={nowPage >= maxPage}
            >
                <img src={ic_arrow_left} className={style.right} />
            </button>
        </div>
    );
}


export default PageButton;
