import { useState, useEffect } from "react";
// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
// Component imports
import Header from "./components/Header";
import Table from "./components/Table";
// Images
import Loading from "./img/loading.svg";



function App({ location }) {
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState([]);
  const [count, setCount] = useState();

  useEffect(() => {
    const getData = async () => {
      import('./data/NewStatuses.json').then(data => {
        const dataArray = Object.entries(data._default).map(([key, value]) => value)
        const length = dataArray.length
        setStatuses(dataArray);
          setCount(length);
       }).catch((err)=> {
         console.log(err)
       }).finally(( )=> {
         setLoading(false)
       })

    };
    getData();
  }, []);

  return (
    <div className="App">
      {/* Top nav section (with the caltrans logo) */}
      <Header />
      <div className="main-content">
        {loading && statuses.length === 0 ? (
          <div className="d-flex justify-content-center">
            <div style={{ width: "100px" }}>
              <img src={Loading} alt="loading" />
            </div>
          </div>
        ) : (
          <Table location={location} statuses={statuses} count={count} />
        )}
      </div>
    </div>
  );
}

export default App;
