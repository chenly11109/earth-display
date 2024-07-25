import { Canvas } from "@react-three/fiber";
import cn from "classnames";
import { useEffect,useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useEarthStore } from "../../state/earthMode";
import WholeCanvas from "./WholeCanvas";
import { useDebounce } from "react-use";
import { AnchorPointsZoom, anchorPointsZoom } from "../../config/Earth/anchorPoints";


function FloatingBox({point, location}:{point?:AnchorPointsZoom, location:{left:string,top:string}}){

  return <div style={location} className={cn("floating_location", !point&&'hidden')}>
    {point?<>
    <div>{point.city},  {point.country}</div>
         <div style={{fontSize:'15px'}}>{point.projectName}</div>
    </>
  :<></>  
  }
  </div>
}

export default function Earth() {
 const {hoveredId} = useEarthStore(state=>state);

  const point =useMemo(()=> hoveredId?anchorPointsZoom.find(item=>item.id===hoveredId):undefined,[hoveredId])

  const [position, setPosition] = useState({x:0, y:0})
  const [debouncedPosition, setDebouncedPosition] = useState({x:0, y:0})

 useDebounce(()=>{
      setDebouncedPosition(position)
  },100,[position])
 

  return (
    <div className="canvas_index"
    onMouseMove={(e)=>{
        setPosition({
          x:e.clientX,
          y:e.clientY
        })
    }}
    >
    
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <WholeCanvas />
      </Canvas>
      <FloatingBox point={point} location={{
    left:debouncedPosition.x + 'px',
    top:debouncedPosition.y+'px'
  }}/>
     
    </div>
  );
}
