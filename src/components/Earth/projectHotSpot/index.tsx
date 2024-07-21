import { useEffect, useRef } from "react";
import * as THREE from "three";
import glowTexture from "./glow.png";
import { GLOBE_RADIUS, GLOBE_SEG } from "../../../config/Earth/earthStyle";

import { useEarthStore } from "../../../state/earthMode";

import AnchorPoints from "../AnchorPoint";
import Streamers from "../Streamer";

export default function ProjectHotSpot() {
  
  const status = useEarthStore((state) => state.status);
  const projectRef = useRef<any>();
  const spriteRef = useRef<any>();
  const materialRef = useRef<any>();

   //地球表面外发光效果的材质
   const spriteMaterials = new THREE.SpriteMaterial( 
    { 
      map: new THREE.TextureLoader().load(glowTexture ), 
      color: "#253DAE", transparent: true, blending: THREE.AdditiveBlending,opacity:1
    });

//一打开页面时隐藏地球
  useEffect(()=>{
    projectRef.current.visible = false;
  },[])
//页面切换时的动画效果
let opacity = 0;
  useEffect(() => {
    //从project跳转到user页面
    if (status) {
      opacity = 1;
      const interval = setInterval(()=>{
        opacity = opacity-0.05;
        materialRef.current.opacity = opacity;
        spriteRef.current.material.opacity = opacity;
      },50)
      setTimeout(() => {
        clearInterval(interval);
        projectRef.current.visible = false;
      }, 1000);
      
    }

     //从project跳转到user页面
    if (!status) {
        projectRef.current.visible = true;
        opacity = 0;
        const interval = setInterval(()=>{
          opacity = opacity+0.05;
          materialRef.current.opacity = opacity;
          spriteRef.current.material.opacity = opacity;
        },50)
        setTimeout(() => {
          clearInterval(interval);      
          materialRef.current.opacity = 1;
          spriteRef.current.material.opacity = 1;
        }, 1000);
      }
  }, [status]);

 


  return (
    <group ref={projectRef}>
      
       {/*外发光效果*/}
      <sprite material={spriteMaterials} scale={[7,7,0]} ref={spriteRef}/>
      {/*光柱，那些长长短短变化的圆柱体，重点项目和非重点项目*/}
      <Streamers />
      {/*地球上闪烁的点+点到点之间的连线*/}
      <AnchorPoints />

      {/*地球球面*/}
      <mesh>
        {/*注释部分为透明的地球表面的效果，处于性能的考虑没有使用 */}
        <meshLambertMaterial
          transparent
          opacity={1}
          ref={materialRef}
          color={"#C8A2C8"}
          // emissive="#1E3F66"
          // emissiveIntensity={0.5}
        />
        <sphereGeometry args={[GLOBE_RADIUS, GLOBE_SEG, GLOBE_SEG]} />
      </mesh>
    </group>
  );
}
