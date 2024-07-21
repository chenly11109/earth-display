import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEarthStore } from "../../state/earthMode";
import WholeCanvas from "./WholeCanvas";


export default function Earth() {

 const {selectedId,pageStatus} = useEarthStore(state=>state);
 //在canvas中不能使用useNavigate, 在这里用selectedId & pageStatus 控制 navigateLink
  const navigate = useNavigate();

  useEffect(()=>{
    if(selectedId){navigate(`/info/${selectedId}`);}
  },[pageStatus,selectedId]);
  return (
    <div className="canvas_index">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <WholeCanvas />
      </Canvas>
    </div>
  );
}
