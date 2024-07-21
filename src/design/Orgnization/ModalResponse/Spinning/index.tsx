import "./index.scss";

export default function Spinning({ height = 80, width = 80, color = "white" }) {
  return (
    <div className="lds-spinner" style={{transform:`scale(${width/80}, ${height/80}) translateY(${-height*height/80}px)`,height,color}}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
