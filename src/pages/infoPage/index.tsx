import InfoContent from '../../design/CanvasType/InfoContent';
import './index.css';
import { Link } from 'react-router-dom';
import { useEarthStore } from '../../state/earthMode';

export default function InfoPage() {

    const {changePageStatus,setSelectedId} = useEarthStore(state=>state)
    return (
        <div className='info_container'>
            <InfoContent />
            <Link onClick={
                ()=>{

                }
            } to="/" style={{position:"absolute", bottom:"60px", right:"150px", fontSize:"30px"}}>Detail</Link>
            <Link 
            onClick={
                ()=>{
                    changePageStatus("blur");
                    setSelectedId("");
                }
            }
            to="/" style={{position:"absolute", bottom:"60px", right:"30px", fontSize:"30px"}}>Back</Link>
        </div>
    )
}
