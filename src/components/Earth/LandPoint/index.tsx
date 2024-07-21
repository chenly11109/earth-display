import { useLayoutEffect, useRef } from 'react';
import { InstancedMesh, Object3D,Color,BackSide } from 'three';
import { spherePoints } from '../../../config/Earth/mapPoints'
const o = new Object3D();



/**
 * 地图的点图
 */
function InstancedLandPoints() {
    const ref = useRef<InstancedMesh>(null!)


    useLayoutEffect(() => {

        for (let idx = 0; idx < spherePoints.length; idx++) {
            const { x, y, z } = spherePoints[idx].pos;
            o.position.set(x, y, z);
            o.lookAt(0, 0, 0);
            o.updateMatrix();

            ref.current.setMatrixAt(idx, o.matrix);
            // ref.current.setColorAt(idx,0xff0000);
        }

        ref.current.instanceMatrix.needsUpdate = true;
    }, [])

    return (
        
        <instancedMesh ref={ref}
            args={[undefined, undefined, spherePoints.length]}
        >
            <circleGeometry args={[0.005, 5]} />
            <meshBasicMaterial color={'white'} side={BackSide}/>
        </instancedMesh>
    )
}

export {
    InstancedLandPoints
}