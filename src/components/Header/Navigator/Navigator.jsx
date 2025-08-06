import style from './Navigator.module.scss';

function Navigator() {
    return (
        <nav className={style.navigator}>
            <a href="/board">자유게시판</a>
            <a href="/market">중고마켓</a>
        </nav>
    );
}

export default Navigator;