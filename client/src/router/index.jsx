import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Items from "../pages/ItemsPage";
import NotFound from "../pages/NotFound";
import Registration from "../pages/Registration";

//React Router 6.4v 데이터 라우터 PAI 방식
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/items", element: <Items /> },
  { path: "/registration", element: <Registration /> },
  { path: "*", element: <NotFound /> },
]);

//<BrowserRouter>방식
function routerTest(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/items" element={<Items />} />
            </Routes>
        </BrowserRouter>
    );
};

export default router;