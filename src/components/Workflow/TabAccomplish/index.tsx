import "./index.css";
import { useState } from "react";
import DistributionTab from "../SubTabDistribution";
import IRTab from "../SubTabIR";
import TaskTab from "../SubTabTask";

////AccomplishTab
type Condition = "online" | "ir" | "task" | "distribution";

const switchConditions = (condition: Condition) => {
  switch (condition) {
    case "ir":
      return <IRTab />;
    case "task":
      return <TaskTab />;
    default:
      return <DistributionTab />;
  }
};

export default function AccomplishTab() {
  const [condition, setCondition] = useState<Condition>("distribution");

  const conditionTab = switchConditions(condition);
  return (
    <div className="accomplish_container" style={{ display: "flex" }}>
      <div className="details_leftBar">
        <span
          className={`${
            condition === "distribution" ? "details_leftBar_item--selected" : ""
          } details_leftBar_item`}
          onClick={() => {
            setCondition("distribution");
          }}
        >
          Distribution
        </span>

        <span
          className={`${
            condition === "ir" ? "details_leftBar_item--selected" : ""
          } details_leftBar_item`}
          onClick={() => {
            setCondition("ir");
          }}
        >
          IR
        </span>
        <span
          className={`${
            condition === "task" ? "details_leftBar_item--selected" : ""
          } details_leftBar_item`}
          onClick={() => {
            setCondition("task");
          }}
        >
          Task
        </span>
      </div>
      {conditionTab}
    </div>
  );
}
