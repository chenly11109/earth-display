import { CSSProperties } from "react";

type Position = CSSProperties['position']

export const QuickConfig = {
  stiffness: 300,
  damping: 20,
  mass: 1
}

export const Quick2Config = {
  stiffness: 200,
  damping: 20,
  mass: 1
}

export const SlowConfig = {
  stiffness: 80,
  damping: 20,
  mass: 1
}

export const GentleConfig = {
  stiffness: 100,
  damping: 15,
  mass: 1
}

export const BouncyConfig = {
  stiffness: 600,
  damping: 15,
  mass: 1
}

export const Move1 = {
    mass: 1,
    tension: 120,
    friction: 20,
}

export const FadeOut1 = {
    mass: 1,
    tension: 240,
    friction: 20,
}

export const FadeIn1 = {

}

export const Stretch1 = {
    tension: 180,
    friction: 12
};

const FadeInWidth = 40 / 1920 * 100;

export const CanvasStyle = {
    home: {
        left: '-5vw',
        top: '-50vh'
    },
    info: {
        left: '20vw',
        top: '15vh'
    },
    other: {
        left: '-23vw',
        top: '-50vh'
    }
}

export const AnchorPointStyle = {
    defaultGeo: [0.04, 0.04, 0.001, 32],
    hoverGeo: [0.06, 0.06, 0.001, 32],
    hoverStartR: 0.15,
    scaleTrend: 1.013,
    opacityTrend: 0.013
}

export function fadeConfig(config: Record<string, any>) {
    return {
        from: {
            opacity: 0,
            fontSize: 40,
            position: 'relative' as Position,
            left: `0vw`
        },
        enter: {
            opacity: 1,
            fontSize: 40,
            position: 'relative' as Position,
            left: `${FadeInWidth}vw`
        },
        leave: {
            opacity: 1,
            fontSize: 40,
            position: 'relative' as Position,
            left: `${FadeInWidth}vw`
        },
        reverse: true,
        delay: 0,
        config
    }
}
