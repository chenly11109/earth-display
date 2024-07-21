import "./index.css";

export default function LogicSelection({
  logicType,
  select,
}: {
  logicType: boolean;
  select: (logicType: boolean) => void;
}) {
  return (
    <div className="details_logic">
      <div>Of the following condition, the user needs to complete:</div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{ display: "flex", flexDirection: "row" }}
          onClick={() => {
            select(false);
          }}
        >
          <div
            className={`details_radio ${
              logicType ? "" : "details_radio--selected"
            }`}
          />{" "}
          <span
            style={{ color: logicType ? "grey" : "white", marginLeft: "20px" }}
          >
            All
          </span>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", marginLeft: "50px" }}
          onClick={() => {
            select(true);
          }}
        >
          <div
            className={`details_radio ${
              logicType ? "details_radio--selected" : ""
            }`}
          />
          <span
            style={{ color: logicType ? "white" : "grey", marginLeft: "20px" }}
          >
            One of them
          </span>
        </div>
      </div>
    </div>
  );
}
