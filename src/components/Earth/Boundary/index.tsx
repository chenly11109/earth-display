import { Vector3,BufferGeometry } from "three";
import { createGeometryArray } from "../../../utils/earthPoints";


const pointArrs = createGeometryArray();

function CountryBorders(){
  return <group>
    {pointArrs.map((pointArr:Array<Vector3>)=>
    {const lineGeometry = new BufferGeometry().setFromPoints(pointArr);
      return (<line geometry={lineGeometry} key={lineGeometry.uuid}>
        <lineBasicMaterial attach="material" color="#7285A5"  />
      </line>)
    }
      )}
  </group>
}

export { CountryBorders };
