import { useFrame } from "@react-three/fiber";
import { DirectionalLight, MathUtils } from "three";

import {
  CameraShake,
  OrbitControls,
  // PerspectiveCamera,
} from "@react-three/drei";
import { GLOBE_RADIUS, GLOBE_SEG } from "../../../config/Earth/earthStyle";

import "./index.css";
import Globe from "../Globe";
import { useEffect, useRef, useState } from "react";
import { useEarthStore } from "../../../state/earthMode";

const cameraShakeConfigRotate = {
  maxYaw: 0.02,
  yawFrequency: 0.05,
  maxPitch: 0.02,
  pitchFrequency: 0,
};

export default function WholeCanvas() {
  const orbitRef = useRef<any>();
  const lightRef = useRef<DirectionalLight>();
  const { zoom } = useEarthStore((state) => state);

  const [cameraPosition, setCameraPosition] = useState([0, 0, 8]);

  //缩放时有一个连贯的动画效果
  useEffect(() => {
    //用于控制最后camera的位置
    const ratio = 4 / 2.5;

    const originVector = orbitRef.current.object.position;
    const [originPositionX, originPositionY, originPositionZ] = [
      originVector.x,
      originVector.y,
      originVector.z,
    ];

    //用于控制缩放的时间，在500 - 2000之间，与距离成正比
    const time = MathUtils.clamp(
      (Math.pow(cameraPosition[0] - originPositionX, 2) +
        Math.pow(cameraPosition[1] - originPositionY, 2) +
        Math.pow(cameraPosition[2] - originPositionZ, 2)) *
        100,
      500,
      2000
    );

    let lerp = 0;
    const lerpInterval = 1 / (time / 50);
    const interval = setInterval(() => {
      zoom(orbitRef.current.getDistance() < 6);
      lerp += lerpInterval;
      orbitRef.current.object.position.set(
        MathUtils.lerp(originPositionX, cameraPosition[0] * ratio, lerp),
        MathUtils.lerp(originPositionY, cameraPosition[1] * ratio, lerp),
        MathUtils.lerp(originPositionZ, cameraPosition[2] * ratio, lerp)
      );
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
    }, time);
  }, [cameraPosition]);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();

    lightRef.current?.position.set(-Math.cos(a / 5), -0.5, -Math.sin(a / 5));
  });

  const [hovered, setHovered] = useState(false);
  const {hoveredId,pageStatus,selectedId} = useEarthStore((state) => state);
  const controlStatus = pageStatus === "blur";


  useEffect(()=>{
    if(!selectedId){
      setCameraPosition([
       0,0,8
      ]);
    }
  },[!!selectedId])
  return (
    <>
      {/* 镜头 */}
      <OrbitControls
        autoRotateSpeed={0.8}
        autoRotate={!hovered && controlStatus}
        enableRotate={pageStatus !== "detail"}
        enableZoom={controlStatus}
        enablePan={false}
        // maxDistance={9}
        // minDistance={4}
        ref={orbitRef}
      />
      <CameraShake {...cameraShakeConfigRotate} controls={orbitRef} />

      {/* 一个和地球同等大小的透明的圆， 用于控制一些互动效果 */}
      <mesh
        onPointerOver={(e) => {
          if (controlStatus) {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "grab";
          }
        }}
        onPointerDown={(e) => {
          if (controlStatus) {
            e.stopPropagation();
            document.body.style.cursor = "grabbing";
          }
        }}
        onPointerUp={(e) => {
          if (controlStatus) {
            e.stopPropagation();
            document.body.style.cursor = "grab";
          }
        }}
        onPointerOut={(e) => {
          if (controlStatus) {
            e.stopPropagation();
            document.body.style.cursor = "auto";
            setHovered(false);
          }
        }}
        onWheel={() => {
          if (controlStatus) {
            zoom(orbitRef.current.getDistance() < 6);
          }
        }}
        visible={false}
        onClick={(e) => {
          if (e.delta < 10 && hoveredId) {
            setCameraPosition([
              e.intersections[0].point.x,
              e.intersections[0].point.y,
              e.intersections[0].point.z,
            ]);
          }
        }}
      >
        <sphereGeometry args={[GLOBE_RADIUS, GLOBE_SEG, GLOBE_SEG]} />
      </mesh>

      {/* 最重要的一个组件，地球本身！ */}
      <Globe />

      {/* 灯光效果 */}
      <directionalLight args={["#BA9FE7", 0.25]} ref={lightRef} />

      <ambientLight args={["#040410", 2]} />

      <spotLight position={[0, -7, 0]} args={["#63C5DA", 1, 100]} />
    </>
  );
}
