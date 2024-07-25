import { anchorPointsZoom } from "../../config/Earth/anchorPoints"
import { useMemo } from "react";
import { useEarthStore } from "../../state/earthMode";
import cn from "classnames";

import './Dashboard.css';

const Dashboard = () => {

  const { selectedId, setSelectedId, changePageStatus} =
  useEarthStore((state) => state);
  const data = useMemo(()=>{
    return anchorPointsZoom.find(item=>item.id === selectedId)
  },[selectedId])

  const { city, country, coords, destinations, projectName, projectDesc, viewCount, star, timeStamp } = data||{};
  // Format timestamp
  const date = timeStamp?new Date(timeStamp).toLocaleDateString("en-US"):'';

  return (<div className={cn("dash_panel", !data?.projectName&&'dash_panel_hidden')}>
     {data &&<> <h1 className="animated-title">{projectName}</h1>
      <p>{projectDesc}</p>
      <ul>
        <li>Location: {city}, {country} ({coords?.join(", ")})</li>
        <li>View Count: {viewCount}</li>
        <li>Stars: {star && '★'.repeat(star)}</li>
        <li>Last Updated: {date}</li>
      </ul>
      <h2>Destinations</h2>
      <ul>
        {destinations?.map((dest, index) => (
          <li key={index}>{`Destination ${index + 1}: Longitude ${dest[0]}, Latitude ${dest[1]}`}</li>
        ))}
      </ul></>}

      <button onClick={()=>{
        setSelectedId('')
        changePageStatus('blur')
      }} className="back-button">
      ← Back
    </button>
    </div>
  
  );
};

export default Dashboard;
