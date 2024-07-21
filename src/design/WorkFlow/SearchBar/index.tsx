import "./index.css";
import { ReactComponent as SearchLogo } from "./search.svg";

export default function SearchBar({
  onChange,

  placeHolder,
  onFocus,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeHolder: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="searchBar">
      <div className="searchBar_icon">
        {" "}
        <SearchLogo />
      </div>
      <input
        className="searchBar_input"
        placeholder={placeHolder}
        onChange={onChange}
        onFocus={onFocus}
      />
    </div>
  );
}
