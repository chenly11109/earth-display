import "./index.css";
import { useState } from "react";

export default function SelectType({
  options,
  defaultValue,
  setValue, //give an outer control for the option value

  style,
}: {
  options: Array<{ value: any; label: string }>;
  defaultValue: { value: string; selectable: boolean };
  setValue: any;

  style?: React.CSSProperties | undefined;
}) {
  const defaultLabel = defaultValue.selectable ? defaultValue.value : "";
  const [showMenu, toggleShowMenu] = useState(false);
  const [label, setLabel] = useState(defaultLabel);

  return (
    <div className="select_container" style={style}>
      <div
        className="select_control_contiainer"
        onClick={(e) => {
          e.stopPropagation();
          toggleShowMenu(!showMenu);
        }}
      >
        <div
          className={`select_control_value ${
            label ? "select_control_value--selected" : ""
          } ${showMenu ? "select_control_value--dropDown" : ""}`}
        >
          {label ? label : defaultValue.value}
        </div>
        <div className="select_control_indicator">&gt;</div>
      </div>
      <div
        className="select_menu_container"
        style={{
          display: showMenu ? "block" : "none",
          height: options.length > 6 ? "250px" : "",
        }}
      >
        {options.map((option) => (
          <div
            className="select_option"
            key={option.label}
            onClick={(e) => {
              e.stopPropagation();
              setValue(option.value);
              setLabel(option.label);
              toggleShowMenu(false);
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}
