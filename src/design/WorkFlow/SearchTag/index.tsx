import "./index.css";
import { useState } from "react";

//setOption:give control outside to hide the searchtag

export default function SearchTag({
  selectTag,
  setOption,
  url,
}: {
  selectTag: any;
  setOption: any;
  url: string;
}) {
  const [value, setValue] = useState("");
  const [menu, showMenu] = useState(false);
  const [options, setOptions] = useState([]);

  const fetchData = () =>
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setOptions(data);
      });

  return (
    <div className="searchTag_container">
      <input
        className="searchTag_value"
        placeholder="Search Tag Name"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        onFocus={() => showMenu(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && value) {
            fetchData();
          }
        }}
      />
      <div
        className="searchTag_menu_container"
        style={{ display: menu ? "" : "none" }}
      >
        {options.map((option) => {
          const optionValue = option.tagName;
          const index = optionValue.indexOf(value);
          const optionValueSuggest = optionValue.slice(index + value.length);

          return index !== 0 ? (
            ""
          ) : (
            <div
              key={option.tagName}
              onClick={() => {
                selectTag(option);
                setOption("add");
              }}
              className="searchTag_menu_item"
            >
              {value}
              <span style={{ color: "grey" }}>{optionValueSuggest}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
