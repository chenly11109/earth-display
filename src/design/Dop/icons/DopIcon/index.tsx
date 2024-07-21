import { useState } from "react";

const setType = (type: string) => {
  switch (type) {
    case "DEFI":
      return { name: "DeFi", color: "255,204,0" };

    case "CROSS_CHAIN":
      return { name: "Cross Chain", color: "255, 124, 185" };

    case "CREATED":
      return { name: "Created", color: "231, 182, 255" };
    case "DAO_FUND":
      return { name: "DAO FUND", color: "198, 152, 220" };
    case "PROTOCOL":
      return { name: "Protocol", color: "198, 152, 220" };
    default:
      return { name: "NFT", color: "105, 204, 255" };
  }
};

export default function DopIcon({ type }: { type: string }) {
  const { name, color } = setType(type);
  const [hover, setOnHover] = useState(false);
  return (
    <span
      className="dopPage_icon"
      style={{
        color: `rgba(${color})`,
        borderColor: `rgba(${color})`,
        background: `rgba(${color},${hover ? 0.5 : 0})`,
      }}
      onMouseEnter={() => {
        setOnHover(true);
      }}
      onMouseLeave={() => {
        setOnHover(false);
      }}
    >
      {name}
    </span>
  );
}
