export enum Browser {
    Opera = 'Opera',
    IE = 'IE',
    Edge = 'Edge',
    FireFox = 'FireFox',
    Chrome = 'Chrome'
}

export function differBrowser(browser: string) {
    const userAgent = navigator.userAgent;
    const isOpera = userAgent.indexOf("Opera") > -1;
    const isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;
    const isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE;
    const isFireFox = userAgent.indexOf("Firefox") > -1;
    const isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1;
    if (browser === Browser.Opera) {
        return isOpera;
    } else if (browser === Browser.IE) {
        return isIE;
    } else if (browser === Browser.Edge) {
        return isEdge;
    } else if (browser === Browser.FireFox) {
        return isFireFox;
    } else if (browser === Browser.Chrome) {
        return isChrome;
    }
    return false;
}