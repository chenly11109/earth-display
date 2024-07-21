import { barItemInfo } from "../types/leftBar";
import { service } from "./service";

// 获取用户的侧边栏
export const getLeftBarList = (url: string) => {
    return service.get(url, {
    }).then((res) => {
        const data: barItemInfo[] = [];
        if(res){
        res.data.data.forEach((i: barItemInfo) => {
            i.select = true;
            data.push(i);
        })}
        return data;
    }).catch((err) => {
        console.log(err)
        return err;
    });
}

// 获取所有自定义的侧边栏
export const getAllCustomBar = (url: string) => {
    return service.get(url, {
    }).then((res) => {
        const data: barItemInfo[] = [];
        if(res){
        res.data.data.forEach((i: barItemInfo) => {
            i.select = false;
            data.push(i);
        })
        return data;
    }}).catch((err) => {
        console.log(err)
        return err;
    });
}

// 移除自定义应用
export const deleteCustomBar = (url: string) => {
    return service.delete(url, {
    }).then((res) => {
        const data: barItemInfo[] = [];
        if(res){
        res.data.data.forEach((i: barItemInfo) => {
            i.select = true;
            data.push(i);
        })
        return data;
    }}).catch((err) => {
        console.log(err)
        return err;
    });
}

// 添加自定义应用
export const addCustomBar = (url: string, type: number) => {
    return service.post(url, {
        type: type
    }).then((res) => {
        const data: barItemInfo[] = [];
       if(res){ res.data.data.forEach((i: barItemInfo) => {
            i.select = true;
            data.push(i);
        })}
        return data;
    }).catch((err) => {
        console.log(err)
        return err;
    });
}
