import { CanvasStyle } from "../config/animation";

// 是否是info的页面
export function isInfo(state: any) {
    const iPage = identifyPage(state);
    if (iPage === 'info') {
        return true;
    }
    return false;
}

// 是否显示光轨
export function showLightRail(state: any) {
    const iPage = identifyPage(state);
    if (iPage === 'info' || iPage === 'detail') {
        return true;
    }
    return false;
}

// 根据地球的状态改变canvas的样式
export function changeStyle(state: any) {
    const iPage = identifyPage(state);
    if (iPage === 'home') {
        return CanvasStyle.home;
    } else if (iPage === 'info') {
        return CanvasStyle.info;
    }
    return CanvasStyle.other;
}

export function identifyPage(state: any) {
    const urlParams = new URL(window.location.href);
    if (state === 'home' || urlParams?.hash === '#/home') {
        return 'home';
    } else if (state === 'info' || urlParams?.hash === '#/info') {
        return 'info';
    } else if (state === 'detail' || urlParams?.hash === '#/detail') {
        return 'detail';
    } else if (state === 'default' || urlParams?.hash === '#/') {
        return 'default';
    }
    return '';
}
