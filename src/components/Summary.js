import React, { useEffect, useState, useContext } from "react";

import { TestContext } from "../context";

const Summary = () => {
  const { statuses: data } = useContext(TestContext);

  /*
   * states are as listed below
   * ar = active and recording
   * au = actice and unknown
   * d  = down
   */
  const [ar, setAr] = useState(0);
  const [au, setAu] = useState(0);
  const [d, setD] = useState(0);

  useEffect(() => {
    const calculateStatuses = () => {
      for (const status in data) {
        if (data[status].NetworkStatus === "DOWN") {
          setD((d) => d + 1);
        }
        if (data[status].NetworkStatus === "ACTIVE") {
          if (data[status].RecordingStatus === "RECORDING") {
            setAr((ar) => ar + 1);
          } else {
            setAu((au) => au + 1);
          }
        }
      }
    };

    calculateStatuses(data);
  }, [data]);

  return (
    <div className="summary position-absolute shadow">
      <h5 style={{ textDecoration: "underline" }}>Summary</h5>
      <div style={{ display: "inline-block" }}>
        <strong>ACTIVE</strong> and <strong>RECORDING</strong>:<br />
        <strong>ACTIVE</strong> and <strong>UNKNOWN</strong>:<br />
        <strong>DOWN (NOT ACTIVE)</strong>:
      </div>
      <div style={{ display: "inline-block", marginLeft: "1rem" }}>
        {ar}
        <br />
        {au}
        <br />
        {d}
        <br />
      </div>
    </div>
  );
};

export default Summary;
