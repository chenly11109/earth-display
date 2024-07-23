# 3D Interactive Earth Visualization Project

## 项目概述

这个项目展示了一个交互式的3D地球模型，具有两种视觉化状态，用于动态展示地球上的关键数据点和项目。第一种状态使用光柱来表示地球上的重点项目及其相互间的交互关系；第二种状态则通过星云形态来显示地球上各种项目的实时热度。

### 功能特性

- **光柱状态**：展示地球上的重点项目，使用光柱和连线显示项目之间的关系。
- **星云状态**：以动态的星云形态显示地球上实时的项目热度，粒子的大小和颜色变化反映项目的活跃程度。

## 技术栈

- **React**: 用于构建用户界面的前端框架。
- **Three.js**: JavaScript 3D库，用于创建和显示动画的3D计算机图形。

## 地球坐标处理

本项目中的地球坐标处理涉及将地理坐标（经度和纬度）转换为3D球面坐标，这一过程是通过以下方法实现的：

### 经纬度转换为球面坐标

我们使用的转换公式如下：

```javascript
function convertLatLngToSphereCoords(longitude, latitude, globeRadius) {
    const phi = (latitude * Math.PI) / 180; // 纬度转换为弧度
    const theta = (longitude * Math.PI) / 180; // 经度转换为弧度

    const x = -(globeRadius) * Math.cos(phi) * Math.cos(theta);
    const y = (globeRadius) * Math.sin(phi);
    const z = (globeRadius) * Math.cos(phi) * Math.sin(theta);

    return [x, y, z];
}
```

## THREE.JS技术应用
#### 着色器的使用
着色器在本项目中用于处理粒子的渲染效果，包括顶点着色器和片元着色器：

`顶点着色器`：负责设置粒子的位置和大小。
`片元着色器`：负责粒子的颜色和纹理。
以下是着色器的核心代码：

```javascript
// 顶点着色器
attribute float size;
attribute vec3 customColor;
varying vec3 vColor;

void main() {
    vColor = customColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (400.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}

// 片元着色器
uniform vec3 color;
uniform sampler2D pointTexture;
varying vec3 vColor;

void main() {
    gl_FragColor = vec4(color * vColor, 1.0);
    gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
}
```


