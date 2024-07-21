import "./index.css";
import SelectType from "../SelectType";
import { useWorkflowStore } from "../../../state/workflow";

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const monthOptions = months.map((index) => ({
  value: index,
  label: String(index + 1).padStart(2, "0"),
}));

const hoursOptions = new Array(24).fill(0).map((_, i) => ({
  value: i,
  label: String(i).padStart(2, "0"),
}));
const minutesOptions = new Array(60).fill(0).map((_, i) => ({
  value: i,
  label: String(i).padStart(2, "0"),
}));

const timeStyle = {
  display: "inline-block",
  width: "60px",
  fontSize: "30px",
  lineHeight: "40px",
};

function daysInMonth(iMonth: number, iYear: number) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}
const year = new Date().getFullYear();
export default function TimeSelection() {
  const setTimeValue = useWorkflowStore((state) => state.workflowUtils.setTimeValue);

  const time = new Date(useWorkflowStore((state) => state.workflow.timeValue));
  const [month, date, hour, minute] = [
    time.getMonth(),
    time.getDate(),
    time.getHours(),
    time.getMinutes(),
  ];

  const datesOptions = new Array(daysInMonth(month, year))
    .fill(0)
    .map((_, i) => ({ value: i + 1, label: String(i + 1).padStart(2, "0") }));
  const yearOptions = [year, year + 1].map((year) => ({
    value: year,
    label: String(year),
  }));

  return (
    <div className="time_selection">
      <SelectType
        options={monthOptions}
        defaultValue={{
          value: String(month + 1).padStart(2, "0"),
          selectable: true,
        }}
        setValue={(monthValue: number) => {
          setTimeValue(
            new Date(year, monthValue, date, hour, minute).getTime()
          );
        }}
        style={timeStyle}
      />
      /
      <SelectType
        options={datesOptions}
        defaultValue={{
          value: String(date).padStart(2, "0"),
          selectable: true,
        }}
        setValue={(dateValue: number) => {
          setTimeValue(
            new Date(year, month, dateValue, hour, minute).getTime()
          );
        }}
        style={timeStyle}
      />{" "}
      /{" "}
      <SelectType
        options={yearOptions}
        defaultValue={{
          value: String(year),
          selectable: true,
        }}
        setValue={(year: number) => {
          setTimeValue(new Date(year, month, date, hour, minute).getTime());
        }}
        style={{ ...timeStyle, width: "100px" }}
      />{" "}
      at{" "}
      <SelectType
        options={hoursOptions}
        defaultValue={{
          value: String(hour).padStart(2, "0"),
          selectable: true,
        }}
        setValue={(hour: number) => {
          setTimeValue(new Date(year, month, date, hour, minute).getTime());
        }}
        style={timeStyle}
      />{" "}
      :{" "}
      <SelectType
        options={minutesOptions}
        defaultValue={{
          value: String(minute).padStart(2, "0"),
          selectable: true,
        }}
        setValue={(minute: number) => {
          setTimeValue(new Date(year, month, date, hour, minute).getTime());
        }}
        style={timeStyle}
      />
      <span className="time_selection_timezone">
        {Intl.DateTimeFormat().resolvedOptions().timeZone}
      </span>
    </div>
  );
}
