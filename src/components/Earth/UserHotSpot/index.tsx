import { useEffect, useLayoutEffect, useRef } from "react";
import { convertLatLngToSphereCoords } from "../../../utils/earthPoints";
import * as THREE from "three";
import pointTexture from "./spark1.png";
import { GLOBE_RADIUS, GLOBE_SEG } from "../../../config/Earth/earthStyle";

import { useEarthStore } from "../../../state/earthMode";
import { useFrame } from "@react-three/fiber";

const amount = 64800;

let positions = new Float32Array(amount * 3);
const colors = new Float32Array(amount * 3);
const sizes = new Float32Array(amount);

const vertex = new THREE.Vector3();
const vertexEmpty = new THREE.Vector3();
const color = new THREE.Color(0xffffff);
const colorEmpty = new THREE.Color(0xffffff);

const geometry = new THREE.BufferGeometry();

const material = new THREE.ShaderMaterial({
  uniforms: {
    color: { value: new THREE.Color("white") },
    pointTexture: {
      value: new THREE.TextureLoader().load(pointTexture),
    },
  },
  vertexShader: `	attribute float size;
  attribute vec3 customColor;

  varying vec3 vColor;

  void main() {

      vColor = customColor;

      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

      gl_PointSize = size * ( 400.0 / -mvPosition.z );

      gl_Position = projectionMatrix * mvPosition;

  }`,
  fragmentShader: `		uniform vec3 color;
  uniform sampler2D pointTexture;

  varying vec3 vColor;

  void main() {

      gl_FragColor = vec4( color * vColor, 1.0 );
      gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

  }`,

  blending: THREE.AdditiveBlending,
  depthTest: true,
  depthWrite: false,
  transparent: true,
});

export default function UserHotPot() {
  const projectRef = useRef<any>();
  const status = useEarthStore((state) => state.status);
  const pointsRef = useRef<any>();

  const user = useEarthStore((state) => state.user);
  const userData = user.data;
  const maximum = user.maximum;
  const minimum = user.minimum;
  const zoomStatus = useEarthStore((state) => state.zoomStatus);
  const countConfig = zoomStatus ? 2 : 1.2;
  const sizeConfig = zoomStatus ? 1.5 : 1;
  useEffect(() => {
    positions = new Float32Array(amount * 3);
    for (let i = 0; i < 180; i++) {
      for (let j = 0; j < 360; j++) {
        const index = (i * 180 + j) * 3;

        if (userData[i][j] > minimum + (maximum - minimum) / countConfig) {
          [vertex.x, vertex.y, vertex.z] = convertLatLngToSphereCoords(
            j - 180,
            i - 90
          );
          vertex.toArray(positions, index);

          color.setHSL(0.51 + 0.3 * (index / amount), 0.65, 0.6);

          color.toArray(colors, index);

          sizes[index / 3] = (userData[i][j] / maximum) * sizeConfig;
        }
      }
    }

    pointsRef.current.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    pointsRef.current.geometry.setAttribute(
      "customColor",
      new THREE.BufferAttribute(colors, 3)
    );
    pointsRef.current.geometry.setAttribute(
      "size",
      new THREE.BufferAttribute(sizes, 1)
    );

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.size.needsUpdate = true;
  }, [zoomStatus]);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    const attributes = pointsRef.current.geometry.attributes;
    if (attributes) {
      for (let i = 0; i < attributes.size.array.length; i++) {
        attributes.size.array[i] =
          attributes.size.array[i] + 0.01 * Math.sin(a + i);
      }

      attributes.size.needsUpdate = true;
    }
  });

  //切换project 页面 和 user页面
  useEffect(() => {
    if (!status) {
      setTimeout(() => (projectRef.current.visible = status), 1000);
    }
    if (status) {
      projectRef.current.visible = status;
    }
  }, [status]);
  return (
    <group ref={projectRef}>
      <mesh>
        <meshStandardMaterial
          //   transparent
          //   opacity={0.8}
          color={"lightGrey"}
          wireframe
          //   emissive="#1E3F66"
          //   emissiveIntensity={0.5}
        />
        <sphereGeometry args={[GLOBE_RADIUS - 0.09, 40, 20]} />
      </mesh>
      <mesh>
        <meshStandardMaterial
          //   transparent
          //   opacity={0.8}
          color={"black"}
          //   emissive="#1E3F66"
          //   emissiveIntensity={0.5}
        />
        <sphereGeometry args={[GLOBE_RADIUS - 0.1, GLOBE_SEG, GLOBE_SEG]} />
      </mesh>

      <points ref={pointsRef} geometry={geometry} material={material}></points>
    </group>
  );
}
