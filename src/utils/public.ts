import { useState, useEffect } from 'react';
// 深拷贝
export function deepCopy<T = any>(source: T): T {
    if (!isObject(source)) return source;
    const target: any = Array.isArray(source) ? [] : {};
    for (const k in source) {
        if (Object.prototype.hasOwnProperty.call(source, k)) {
            if (typeof source[k] === 'object') {
                target[k] = deepCopy(source[k]);
            } else {
                target[k] = source[k];
            }
        }
    }
    return target;
}

function isObject(obj: any) {
    return typeof obj === 'object' && obj !== null;
}

// 处理换行的字符串
export function convertTextare(text: string) {
    const sentences = [];
    let s = '';
    for (let i = 0; i < text.length; i++) {
        if (text[i] === '\n') {
            sentences.push(s);
            s = '';
        } else {
            s = s + text[i];
        }
    }
    sentences.push(s);
    return sentences;
}

// 计算文本在文本域显示的行数
export function getTextareaLineCount(value: string) {
    const lines = value.split(/\r*\n/);
    let lineCount = 0;
    lines.forEach((line: any) => {
        const theLine = Math.floor(line.length / 79) + 1;
        lineCount = lineCount + theLine;
    })
    return lineCount;
}

//get window dimentions

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}