import {  useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

import { meshBounds } from "@react-three/drei";

import { useEarthStore } from "../../../state/earthMode";

//密布在地球表面的一些点，在目前的地球设计中取消了
// import { InstancedLandPoints } from "./LandPoint";
import { CountryBorders } from "../Boundary";
import UserHotPot from "../UserHotSpot";
import ProjectHotSpot from "../projectHotSpot";


function Ring({
  position,
  rotation,
  ringArgs,
  rotationZ,
}: {
  position: any;
  rotation: any;
  ringArgs: any;
  rotationZ: number;
}) {
  useFrame(() => {
    ref.current.rotation.z += rotationZ;
  });


  const ref = useRef<any>();

  
    return (
    <mesh position={position} rotation={rotation} ref={ref}>
      <ringBufferGeometry args={ringArgs} />

      <meshBasicMaterial attach="material" color="#7285A5" side={THREE.DoubleSide} />
    </mesh>
  );
}


export default function Globe() {
  const meshRef = useRef();
  return (
    <group
      // scale={scale}
      visible
      position={[0, 0, 0]}
      ref={meshRef}
      raycast={meshBounds}
    >

      <CountryBorders />

       {/*用户数据星云*/}
      <UserHotPot/>
      <ProjectHotSpot/>

         {/*一些酷炫的轨道线，现在看起来有点花，就隐藏一下 */}
   <group visible={false}>        
        <Ring
          position={[0, -1, 0]}
          rotation={[1.5, 0.5, 1.5]}
          rotationZ={0.02}
          ringArgs={[5.3, 5.303, 52, 36, 0.5, 1]}
        />
        <Ring
          position={[0, -1, 0]}
          rotation={[1.5, 0.5, 1.5]}
          rotationZ={0.01}
          ringArgs={[5, 5.003, 52, 36, 0.5, 0.8]}
        />
        <Ring
          position={[0, 0.5, 0]}
          rotation={[-1.5, 0.5, -1.5]}
          rotationZ={-0.02}
          ringArgs={[6.3, 6.303, 52, 36, 0.5, 1]}
        />
        <Ring
          position={[0, 0.5, 0]}
          rotation={[-1.5, 0.5, -1.5]}
          rotationZ={-0.01}
          ringArgs={[6.0, 6.003, 52, 36, 0.5, 0.8]}
        />
    </group>

  {/*密布在地球表面的一些点，在目前的地球设计中取消了 */}
      {/* <InstancedLandPoints /> */}

     

    </group>
  );
}
