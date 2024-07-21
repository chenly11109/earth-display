import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { QuadraticBezierLine } from "@react-three/drei";
import {
  Mesh,
  DoubleSide,
  QuadraticBezierCurve3,
  Vector3,
  BufferGeometry,
  EllipseCurve,
} from "three";
import { useEarthStore } from "../../../state/earthMode";
import {
  convertLatLngToSphereCoords,
  getControlPoint,
} from "../../../utils/earthPoints";
import { useNavigate } from "react-router-dom";

//光轨两端曲线会被球体挡住，可以考虑用CubicCurve,用lerp取得两个控制点，曲线会好看一些，但有可能对性能上有更高要求
function LightRail({
  pos,
  posEnd,
}: {
  posEnd: [number, number, number];
  pos: [number, number, number];
}) {
  const controlPoint = getControlPoint(pos, posEnd);

  //上面提到可以用CubicCurve取代的地方
  const curve = new QuadraticBezierCurve3(
    new Vector3(...pos),
    new Vector3(...controlPoint),
    new Vector3(...posEnd)
  );
  const points = curve.getPoints(30);
  const curveGeometry = new BufferGeometry().setFromPoints(points);
  const curveRef = useRef<any>();
  const start = posEnd[0];

  let frame = 0;

  useLayoutEffect(() => {
    curveRef.current.computeLineDistances();
  }, []);

  useFrame(({ clock }) => {
    frame = clock.getElapsedTime();
    const range = (((start * 10 + frame) * 10) % 60) - 20;

    curveRef.current.geometry.setDrawRange(0, range);
  });
  return (
    <line ref={curveRef} geometry={curveGeometry}>
      <lineBasicMaterial color={"#5E5A80"} linewidth={1} />
    </line>
  );
}
function AnchorPoint({
  pos,
  id,
}: {
  pos: [number, number, number];
  id: string;
}) {
  const [hovered, setHovered] = useState(false);
  
  //这边牵扯到地球的一些空置状态，基本的想法是pageStatu对应一个zoomStatus,selectedId 对应选择的项目
  const { pageStatus, changePageStatus, zoomStatus, selectedId, setSelectedId} =
    useEarthStore((state) => state);

  const selectNow = selectedId === id;

  let [x] = pos;
  const meshRef = useRef<Mesh>(null!);
  useLayoutEffect(() => {
    meshRef.current.position.set(...pos);
    meshRef.current.lookAt(0, 0, 0);
  }, []);

  useFrame(() => {
    x = x + 0.01;
    const frame =
      hovered || selectNow
        ? 5 + Math.cos(x * 15) / 2
        : zoomStatus
        ? 2 + Math.cos(x * 5)
        : 4 + Math.cos(x * 5);
    meshRef.current.scale.set(frame, frame, frame);
  });

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "pointer";
    }
    if (!hovered) {
      document.body.style.cursor = "grab";
    }
  }, [hovered]);


  return (
    <>
      <mesh
        ref={meshRef}
        onPointerOver={() => {
          if (!(pageStatus === "detail")) {
            setHovered(true);
          }
        }}
        onPointerOut={() => {
          if (!(pageStatus === "detail")) {setHovered(false);}
        }}
        onClick={() => {
          if (!(pageStatus === "detail")) {
            changePageStatus("focus");
            setSelectedId(id);
          }
        }}
      >
        <circleBufferGeometry args={[0.01, 6]} />
        <meshNormalMaterial side={DoubleSide} />
      </mesh>
    </>
  );
}

function AnchorPoints() {
  const zoomStatus = useEarthStore((state) => state.zoomStatus);
  const { anchorPoints, anchorPointsZoom } = useEarthStore((state) => state);
  const groupRef = useRef<any>();

  const status = useEarthStore((state) => state.status);
  useEffect(() => {
    groupRef.current.visible = !status;
  }, [status]);
  return (
    <group ref={groupRef}>
      {(zoomStatus ? anchorPointsZoom : anchorPoints).map((point) => (
        <group key={point.id}>
          <LightRail
            posEnd={convertLatLngToSphereCoords(...point.destinations[0])}
            pos={convertLatLngToSphereCoords(...point.coords)}
          />
          <AnchorPoint
            id={point.id}
            pos={convertLatLngToSphereCoords(...point.coords)}
          />
        </group>
      ))}
    </group>
  );
}

export default AnchorPoints;
