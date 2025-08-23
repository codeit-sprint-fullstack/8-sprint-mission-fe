import { useState, useEffect} from 'react';
import { RouterProvider } from "react-router-dom";

import LocaleContext from "./contexts/LocaleContext";
import router from "./router";

//이 임포트 방식은 전역이라 관리가 어렵다.
//모듈 방식으로 바꿔야 할 것 같다.
import './styles/global.css';
import './styles/home.css';
import './styles/items.css'


/* 화면 너비에 따른 다바이스 상태는 쓰는 곳이 많아서
전역 Context로 관리하기로 했습니다. */

function App(){

    const [deviceType, setDeviceType] = useState(getDeviceType(window.innerWidth));

    // 창 크기에 따라 deviceType 계산
    function getDeviceType(width) {
        if (width >= 1200) return 'desktop';
        if (width >= 744) return 'tablet';
        return 'mobile';
    }

    // 창 크기 변경 감지
    useEffect(() => {
        const handleResize = () => {
            const newType = getDeviceType(window.innerWidth);
            setDeviceType((prev) => (prev !== newType ? newType : prev));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <LocaleContext.Provider value={deviceType}>
            <RouterProvider router={router}/> 
            {/* <Router /> //브라우저 라우터 방식 */}
        </LocaleContext.Provider>
    );
}

export default App;