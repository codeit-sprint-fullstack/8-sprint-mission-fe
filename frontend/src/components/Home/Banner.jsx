import { Link } from "react-router-dom";

function Banner({bgImg, btnUrl='', btnText='', children}){

    const style = {
        backgroundImage: url(bgImg)
    }

    return(
        <section style={style} className="banner">
            <div className="wrapper">
                {children}
                {btnUrl && <Link to={btnUrl}><button className="button pill-button">{btnText}</button></Link>}
            </div>
        </section>
    );
}

export default Banner;