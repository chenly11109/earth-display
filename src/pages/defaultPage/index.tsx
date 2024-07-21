
import {Outlet} from 'react-router-dom';
import LeftBar from "../../components/LeftBar/LeftBar";
import './index.css';

export default function DefaultPage() {

    return (
        <>
       
       <Outlet/>
       <LeftBar />
       </>
    )
}
