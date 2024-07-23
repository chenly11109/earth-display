import { Canvas } from "@react-three/fiber";
import { useEffect,useState, useMemo, createPortal } from "react";
import { useNavigate } from "react-router-dom";
import { useEarthStore } from "../../state/earthMode";
import WholeCanvas from "./WholeCanvas";
import { AnchorPointsZoom, anchorPointsZoom } from "../../config/Earth/anchorPoints";


function FloatingBox({point}:{point:AnchorPointsZoom}){
  return <div>
    {point.projectName}
    {point.star}
  </div>
}

export default function Earth() {
 const {selectedId,pageStatus,hoveredId} = useEarthStore(state=>state);
 //在canvas中不能使用useNavigate, 在这里用selectedId & pageStatus 控制 navigateLink
  const navigate = useNavigate();

  const point =useMemo(()=> anchorPointsZoom.find(item=>item.id===hoveredId),[hoveredId])
  useEffect(()=>{
    if(selectedId){navigate(`/info/${selectedId}`);}
  },[pageStatus,selectedId]);
  const [position, setPosition] = useState({x:0, y:0})

  return (
    <div className="canvas_index"
    onMouseMove={(e)=>{
      if(point){
        setPosition({
          x:e.clientX,
          y:e.clientY
        })
      }
    }}
    >
    
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <WholeCanvas />
      </Canvas>
      <div
      className="floating_location"
      style={{
        left:position.x + 'px',
        top:position.y+'px'
      }}
      >
       blabalblablab
      </div>
    </div>
  );
}
