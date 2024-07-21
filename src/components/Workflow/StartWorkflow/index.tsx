import "./index.css";
import { useState } from "react";
import SelectType from "../../../design/WorkFlow/SelectType";
import { animated, useSpring } from "@react-spring/web";
import TimeSelection from "../../../design/WorkFlow/TimeSelection";
import { useWorkflowStore } from "../../../state/workflow";

function StartTime() {
  const { effectType, timeValue } = useWorkflowStore((state) => state.workflow);
  const { setEffectType } = useWorkflowStore((state) => state.workflowUtils);

  const time = new Date(timeValue);

  const [month, date, year, hour, minute] = [
    String(time.getMonth() + 1).padStart(2, "0"),
    String(time.getDate()).padStart(2, "0"),
    time.getFullYear(),
    String(time.getHours()).padStart(2, "0"),
    String(time.getMinutes()).padStart(2, "0"),
  ];

  return (
    <>
      <div className="startWorkflow_title">Set event-workflow start time</div>
      <div className="startWorkflow_selection_container">
        <div
          style={{ flex: "row", display: "flex", position: "relative" }}
          onClick={() => setEffectType(true)}
        >
          <div
            className={`startWorkflow_selection_input ${
              effectType ? "startWorkflow_selection_input--selected" : ""
            }`}
          />
          <div style={{ color: effectType ? "" : "grey" }}>
            Available when published
          </div>
        </div>
        <div
          style={{ flex: "row", display: "flex", position: "relative" }}
          onClick={() => setEffectType(false)}
        >
          <div
            className={`startWorkflow_selection_input ${
              effectType ? "" : "startWorkflow_selection_input--selected"
            }`}
          />
          <div style={{ color: effectType ? "grey" : "" }}>
            Available starting from
            {effectType ? (
              <span>
                {" "}
                {month} / {date} / {year} at {hour} : {minute}
              </span>
            ) : (
              <TimeSelection />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function DurationTime() {
  const { duration, durationType } = useWorkflowStore((state) => state.workflow);
  const { setDuration, setDurationType } = useWorkflowStore(
    (state) => state.workflowUtils
  );

  return (
    <>
      <div className="startWorkflow_title">Set event-workflow duration</div>
      <div className="startWorkflow_selection_container">
        <div
          style={{ flex: "row", display: "flex", position: "relative" }}
          onClick={() => setDurationType(0)}
        >
          <div
            className={`startWorkflow_selection_input ${
              durationType ? "" : "startWorkflow_selection_input--selected"
            }`}
          />
          <div style={{ color: durationType ? "grey" : "" }}>Always valid</div>
        </div>
        <div
          style={{ flex: "row", display: "flex", position: "relative" }}
          onClick={() => {
            setDurationType(1);
          }}
        >
          <div
            className={`startWorkflow_selection_input ${
              durationType ? "startWorkflow_selection_input--selected" : ""
            }`}
          />
          <div
            style={{
              color: durationType ? "" : "grey",
              display: "flex",
              flexDirection: "row",
            }}
          >
            Within{" "}
            {durationType ? (
              <span>
                <input
                  type="number"
                  className="inputs_number"
                  value={duration}
                  onChange={(e) => {
                    const tagetValue = Number(e.target.value);
                    const value =
                      tagetValue > 1
                        ? tagetValue < 1000
                          ? tagetValue
                          : 999
                        : 1;
                    setDuration(value);
                  }}
                />
              </span>
            ) : (
              duration
            )}{" "}
            {durationType ? (
              <span>
                <SelectType
                  options={[
                    { value: 2, label: "hour" },
                    { value: 1, label: "day" },
                  ]}
                  defaultValue={{
                    value: durationType === 1 ? "day" : "hour",
                    selectable: true,
                  }}
                  setValue={setDurationType}
                  style={{
                    width: "100px",
                    lineHeight: "40px",
                    position: "relative",
                    top: "30px",
                  }}
                />
              </span>
            ) : (
              "day"
            )}
            {duration > 1 ? "s" : ""} from start time
          </div>
        </div>
      </div>
    </>
  );
}

const commonConfig = {
  mass: 1,
  tension: 120,
  friction: 14,
};

export default function StartWorkflow({
  start,
  setStart,
}: {
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [next, setNext] = useState(true);

  const { o, trXY } = useSpring({
    o: start ? 1 : 0,
    trXY: start ? [0, 0, 1, 1] : [35, -48, 0, 0],
    config: commonConfig,
  });
  return (
    <animated.div
      className="startWorkflow_container"
      style={{
        transform: trXY.to(
          (tx, ty, sx, sy) => `translate(${tx}%, ${ty}%) scale(${sx},${sy})`
        ),
        opacity: o,
      }}
    >
      {next ? <StartTime /> : <DurationTime />}
      <div className="startWorkflow_buttons_container">
        {next ? (
          <span
            className="startWorkflow_button"
            onClick={() => {
              setNext(false);
            }}
          >
            Next
          </span>
        ) : (
          <span
            className="startWorkflow_button"
            onClick={() => {
              setNext(true);
              setStart(!start);
            }}
          >
            {" "}
            Done
          </span>
        )}
      </div>
    </animated.div>
  );
}
