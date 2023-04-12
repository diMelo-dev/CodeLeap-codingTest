import { useRoutes } from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { NotFound } from "../pages/NotFound";
import { MainScreen } from "../pages/MainScreen";


export function MainRoutes(){
    
    let routes = useRoutes([
        { path: '/', element: <SignUp /> },
        { path: '/main-screen', element: <MainScreen /> },
        { path: '*', element: <NotFound /> }
    ]);

    return(routes);

};