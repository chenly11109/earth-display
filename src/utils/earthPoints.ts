import * as THREE from 'three';
import { Vector3, MathUtils } from 'three';
import worldGeoJson from '../config/Earth/worldGeo';
import { GLOBE_RADIUS } from "../config/Earth/earthStyle";
import { View2dInfo, View3dInfo } from '../types/earthInter';

// 二维坐标转换成三维坐标
export function convertFlatCoordsToSphereCoords(x: number, y: number, globeRadius: number) {
    const globeWidth = 4098 / 2;
    const globeHeight = 1968 / 2;
    let latitude = ((x - globeWidth) / globeWidth) * -180-180;
    let longitude = ((y - globeHeight) / globeHeight) * -90+3;
    latitude = (latitude * Math.PI) / 180;
    longitude = (longitude * Math.PI) / 180;
    const radius = Math.cos(longitude) * globeRadius;
    const _x = Math.cos(latitude) * radius;
    const _y = Math.sin(longitude) * globeRadius;
    const _z = Math.sin(latitude) * radius;
    return {
        x: _x,
        y: _y,
        z: _z,
    };
}

//经纬度转化为三维坐标
export function convertLatLngToSphereCoords(
    longitude: number,
    latitude: number,
    globeRadius=GLOBE_RADIUS
  ) : [number,number,number] {
    const radius = globeRadius;
    //调整竖向的扭曲
    const phi = (latitude * Math.PI) / 180;
     //调整横向的扭曲
    const theta = ((longitude) * Math.PI) / 180;
    const x = -(radius ) * Math.cos(phi) * Math.cos(theta);
    const y = (radius) * Math.sin(phi);
    const z = (radius) * Math.cos(phi) * Math.sin(theta);
    return [
      x,
      y,
      z,
    ];
  }

  //这两个函数所用的数据mock为random数据， 以后要先lerp至[0.3,0.8] / [1.2,1.5]
export function createView3d(globeRadius: number, points: View2dInfo[]) {
    const spherePoints: View3dInfo[] = [];
    // 循环遍历所有点将2维坐标映射到3维坐标
    for (const point of points) {
        const pos = convertFlatCoordsToSphereCoords(point.x, point.y, globeRadius);
        if (pos.x && pos.y && pos.z) {
            const pos3d = new Vector3(pos.x, pos.y, pos.z);
            const view3dInfo: View3dInfo = {
                pos: pos3d,
                value: MathUtils.clamp(Math.random(),0.3,0.8)
            }
            spherePoints.push(view3dInfo);
        }
    }
    return spherePoints;
}

interface View3dInfoSignature extends View3dInfo{
    posEnd:Vector3;
}

export function createView3dSignature(globeRadius: number, points: View2dInfo[]) {
    const spherePoints: View3dInfoSignature[] = [];
    // 循环遍历所有点将2维坐标映射到3维坐标
    for (const point of points) {
        const value = MathUtils.clamp(Math.random(),1.2,1.5)
        const pos = convertFlatCoordsToSphereCoords(point.x, point.y, globeRadius);
        const posEnd = convertFlatCoordsToSphereCoords(point.x, point.y, globeRadius+value/1.9);
        if (pos.x && pos.y && pos.z) {
            const pos3d = new Vector3(pos.x, pos.y, pos.z);
            const posEnd3d = new Vector3(posEnd.x,posEnd.y,posEnd.z)
            const view3dInfo: View3dInfoSignature = {
                posEnd:posEnd3d,
                pos: pos3d,
                value: value
            }
            spherePoints.push(view3dInfo);
        }
    }
    return spherePoints;
}


export function getControlPoint(
    pos: [number, number, number],
    posEnd: [number, number, number]
){
    const [posX, posY, posZ] = pos;
    const [posEndX, posEndY, posEndZ] = posEnd;
    const [centerX,centerY,centerZ] = [
      (posX + posEndX) / 2,
      (posY + posEndY) / 2,
      (posZ + posEndZ) / 2,
    ];
    const length = Math.sqrt(centerX*centerX + centerY*centerY+centerZ*centerZ);
    const lineLength = Math.pow((posEndX-posX),2)+Math.pow((posEndY-posY),2)+Math.pow((posEndZ-posZ),2);
  
    const normal =MathUtils.clamp( lineLength/length*0.3,1.5,4);
    return [centerX*normal,centerY*normal,centerZ*normal];
}
export function computeSphereMatrix() {
    const matrix = new THREE.Matrix4;
    matrix.makeRotationZ(Math.PI / 2+0.1);
    return matrix;
}



export function createGeometryArray() {
    const worldGeo = worldGeoJson.features;
    const pointArrs:Array<Array<Vector3>>=[];

    worldGeo.forEach((country) => {
        let coordinates: number[][][] = [];
        if (country.geometry.type === "Polygon") {
            coordinates = country.geometry.coordinates as number[][][];
        } else if (country.geometry.type === "MultiPolygon") {
            (country.geometry.coordinates as number[][][][]).forEach((coordinate) =>
                coordinates.push(...coordinate)
            );
        }

        coordinates.forEach((polygon) => {

            const pointArr: Array<Vector3> = [];
            polygon.forEach((elem) => {
                pointArr.push(
                   new Vector3(...convertLatLngToSphereCoords(elem[0], elem[1], GLOBE_RADIUS))
                );
            });

            pointArrs.push(pointArr);

        });

    });
    return pointArrs;
}
