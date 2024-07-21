import { Vector3 } from 'three';

export interface View2dInfo {
    x: number,
    y: number,
    value?: number
}

export interface View3dInfo {
    pos: Vector3,
    value?: number
}

export interface Area {
    id: string,
    bPoints: View3dInfo[], // 边界点
    cPoint: View3dInfo, // 中心点
    name: string,
    title: string,
    parentTitle: string,
    grade: number
}
