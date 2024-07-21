import create from 'zustand';
import produce from "immer";
import { Vector3 } from '@react-three/fiber';

import { anchorPoints, anchorPointsZoom } from "../config/Earth/anchorPoints";
import { streamerPointsSignature, streamerPoints, streamerPointsSignatureZoom, streamerPointsZoom } from "../config/Earth/mapPoints";
import { userData } from "../config/Earth/userInformation";

interface View3dInfo {
    pos: Vector3,
    value?: number
}

interface View3dInfoSignature extends View3dInfo {
    posEnd: Vector3
}

type anchorPoints =
    Array<{
        id: string;
        coords: [number, number];
        timeStamp: number;
        data: string;
        destinations: Array<[number, number]>
    }>

interface EarthModeType {

    //第一页地球上点的坐标信息，之后为后端取得，data structure 会有调整，现在为mock数据
    anchorPoints: anchorPoints;
    anchorPointsZoom:anchorPoints;

    //地球展示页面，false为（projectHotSpot），true为（userHotSpot）
    status: boolean;
    changeStatus: () => void;

    //zoom与否，zoom时会显示更多信息
    zoomStatus: boolean;
    zoom: (zoomStatus: boolean) => void;

    streamer: Array<View3dInfo>;
    streamerSignature: Array<View3dInfoSignature>;
    streamerZoom: Array<View3dInfo>;
    streamerSignatureZoom: Array<View3dInfoSignature>;

    user: {
        data: number[][];
        maximum: number;
        minimum: number;
    }

    //确保同一时间只有一个项目是selected的状态，用于disable其他的项目
    selectedId:string;
    setSelectedId:(setSelectedId:string)=>void;

    //对应页面的三个状态，blur为全局状态，focus 为点一个项目zoom到项目的状态， detail 为页面的详情，右下角
    pageStatus: "blur" | "focus" | "detail";
    changePageStatus:(status:"blur" | "focus" | "detail")=>void;
}

export const useEarthStore = create<EarthModeType>((set) => ({
    status: true,
    changeStatus: () => set(produce((state: EarthModeType) => { state.status = !state.status })),
    anchorPoints: anchorPoints,
    anchorPointsZoom: anchorPointsZoom,

    streamer: streamerPoints,
    streamerZoom: streamerPointsZoom,

    streamerSignature: streamerPointsSignature,
    streamerSignatureZoom: streamerPointsSignatureZoom,

    user: { data: userData, maximum: 6859, minimum: 2 },

    zoomStatus: false,
    zoom: (zoomStatus: boolean) => set(produce((state: EarthModeType) => { state.zoomStatus = zoomStatus })),

    selectedId:"",
    setSelectedId:(selectedId:string)=>set(produce((state:EarthModeType)=>{
        state.selectedId = selectedId;
    })),
    pageStatus:"blur",
    changePageStatus:(status:"blur" | "focus" | "detail")=>set(produce((state:EarthModeType)=>{
        state.pageStatus = status
    }))

}))