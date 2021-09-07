import React from "react";

import CheckMark from "../img/Checkmark.svg";
import XMark from "../img/close.svg";
import QuestionMark from "../img/question.svg";

const redDot = (
  <svg height="16" width="16">
    <circle cx="8" cy="8" r="8" fill="red" />
  </svg>
);
const greenDot = (
  <svg height="16" width="16">
    <circle cx="8" cy="8" r="8" fill="#53d771" />
  </svg>
);
const yellowDot = (
  <svg height="16" width="16">
    <circle cx="8" cy="8" r="8" fill="yellow" />
  </svg>
);

// const handleColorChange = (e) => {
//   const targetRow = e.currentTarget;
//   if (!targetRow.classList.contains("bckgrnd-selected")) {
//     targetRow.classList.add("bckgrnd-selected");
//   } else {
//     targetRow.classList.remove("bckgrnd-selected");
//   }
// };

const Row = ({ data }) => {
  // 'Index' from data not needed
  const {
    NetworkStatus,
    RecordingStatus,
    SiteName,
    SiteVoltage,
    ADRTime,
    IP_ADDRESS,
    Port,
    ADR_Model,
    ServerTime,
    LocationName,
    Latitude,
    Longitude,
    StationLabel,
  } = data;

  let googleMapLink = `https://www.google.com/maps/search/?api=1&query=${Latitude},${Longitude}`;

  return (
    <tr className="">
      <td className="ps-4">{data.count}</td>
      <td>
        <div className="d-flex">
          <span className="me-2 d-inline-block svg-wrapper">
            {NetworkStatus === "ACTIVE" ? (
              <img src={CheckMark} className="img-fluid" alt="check" />
            ) : NetworkStatus === "DOWN" ? (
              <img src={XMark} className="img-fluid" alt="down" />
            ) : (
              <img src={QuestionMark} className="img-fluid" alt="down" />
            )}
          </span>
          {NetworkStatus}
        </div>
      </td>

      <td>
        <span className="me-2 d-inline-block svg-wrapper">
          {RecordingStatus === "RECORDING"
            ? greenDot
            : RecordingStatus === "IDLE"
            ? yellowDot
            : redDot}
        </span>
        {RecordingStatus}
      </td>
      <td>{SiteName}</td>
      <td>{SiteVoltage}</td>
      <td>{ADRTime}</td>
      <td>{IP_ADDRESS}</td>
      <td>{Port}</td>
      <td>{ADR_Model}</td>
      <td>{ServerTime}</td>
      <td>{LocationName}</td>
      <td>{StationLabel}</td>
      <td>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={googleMapLink}
          style={{ color: "#212529" }}
        >
          go to map
        </a>
      </td>
    </tr>
  );
};

export default Row;
