import { useEarthStore } from "../../state/earthMode";
import "./index.css"
import cn from 'classnames'


export default function EarthIcon(){
    const {changeStatus, status} = useEarthStore(state=>state);

    return <div
     className={cn("earth-icon", status && 'earth-icon__status')}
     onClick= {()=>{changeStatus()}}
    >
        
    </div>
}