// import { spherePointsSignature,spherePoints } from "../../../config/Earth/mapPoints"
import { Vector3, Mesh, BackSide } from "three";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useEarthStore } from "../../../state/earthMode";

function Streamer({ pos = new Vector3(), value = 0 }) {
  const meshRef = useRef<Mesh>(null!);
  const circleRef = useRef<Mesh>(null!);
  const {zoomStatus,status} = useEarthStore((state) => state);

  useEffect(() => {
    meshRef.current.position.set(pos.x, pos.y, pos.z);

    meshRef.current.lookAt(0, 0, 0);
    meshRef.current.rotateX(Math.PI / 2);

    circleRef.current.position.set(pos.x, pos.y, pos.z);
    circleRef.current.lookAt(0, 0, 0);
  }, []);

  

  useFrame(({ clock }) => {

    const x = 2 * clock.getElapsedTime() + pos.x;
    const scale = zoomStatus?(Math.sin(x)+1)/3:(Math.sin(x)+2)/3
    meshRef.current.scale.set(1, scale, 1);
  });

  return (
    <>
      <mesh ref={circleRef}>
        <circleBufferGeometry args={[0.015, 8]} />
        <meshBasicMaterial side={BackSide} color={"blue"} />
      </mesh>
      <mesh ref={meshRef}>
        <cylinderBufferGeometry args={[0.015, 0.015, value, 6]} />
        <meshNormalMaterial opacity={0.4} transparent />
      </mesh>
    </>
  );
}

function StreamerSignature({
  pos = new Vector3(),
  value = 0,
  posEnd = new Vector3(),
}) {
  const meshRef = useRef<Mesh>(null!);
  const boxRef = useRef<Mesh>(null!);
  const {zoomStatus,status} = useEarthStore((state) => state);

  useFrame(({ clock }) => {
    const x = 2 * clock.getElapsedTime() + pos.x;
    const scale = zoomStatus?(Math.sin(x)+4)/9:(Math.sin(x)+8)/9
    meshRef.current.scale.set(1, scale, 1);
  });

  useEffect(()=>{
    const scale = zoomStatus? 0.91:1;
    boxRef.current.position.set(posEnd.x*scale,posEnd.y*scale, posEnd.z*scale)
  },[zoomStatus])
  useEffect(() => {
    boxRef.current.position.set(posEnd.x, posEnd.y, posEnd.z);

    meshRef.current.position.set(pos.x, pos.y, pos.z);
    meshRef.current.lookAt(0, 0, 0);
    meshRef.current.rotateX(Math.PI / 2);
  }, []);

  return (
    <>
      <mesh ref={boxRef}>
        <boxBufferGeometry args={[0.02, 0.02, 0.02]} />
        <meshBasicMaterial color={"white"} />
      </mesh>

      <mesh ref={meshRef}>
        <cylinderBufferGeometry args={[0.02, 0.02, value, 6]} />
        <meshNormalMaterial />
      </mesh>
    </>
  );
}

export default function Streamers() {
  const zoomStatus = useEarthStore((state) => state.zoomStatus);

  const { streamer, streamerSignature, streamerZoom, streamerSignatureZoom } =
    useEarthStore((state) => state);

  return (
    <>
      <group visible={zoomStatus}>
        {streamerZoom.map((point, i) => (
          <Streamer key={i} pos={point.pos as Vector3} value={point.value} />
        ))}

        {streamerSignatureZoom.map((point, i) => (
          <StreamerSignature
            key={i}
            pos={point.pos as Vector3}
            posEnd={point.posEnd as Vector3}
            value={point.value}
          />
        ))}
      </group>
      <group visible={!zoomStatus}>
        {streamer.map((point, i) => (
          <Streamer key={i} pos={point.pos as Vector3} value={point.value} />
        ))}

        {streamerSignature.map((point, i) => (
          <StreamerSignature
            key={i}
            pos={point.pos as Vector3}
            posEnd={point.posEnd as Vector3}
            value={point.value}
          />
        ))}
      </group>
    </>
  );
}
