import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";

// components
import Row from "./Row";
import Controls from "./Controls";

// context
import { TestProvider } from "../context";

// utils
import { filterFunc } from "../utils";



const tableHead = (
  <thead className="table-dark">
    <tr>
      <th scope="col" className="ps-4">
        #
      </th>
      <th scope="col">Network Status</th>
      <th scope="col">Recording Status</th>
      <th scope="col">Site Name</th>
      <th scope="col">Site Voltage</th>
      <th scope="col">Adr Time</th>
      <th scope="col">Ip Address</th>
      <th scope="col">Port</th>
      <th scope="col">Adr Model</th>
      <th scope="col">Server Time</th>
      <th scope="col">Location Name</th>
      <th scope="col">Station Label</th>
      <th scope="col">map link</th>
    </tr>
  </thead>
);

const Table = ({ statuses, count }) => {
  const location = useLocation();
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [filtered, setFiltered] = useState(statuses);

  const updateCheckedState = useCallback(() => {
    /*
     * this function checks the url, parses it for our filters, if filters empty or false
     * it assigns all 'statuses' to the 'filtered' value, which is rendered to the screen
     *
     * if there are filters, it filters the 'statuses' with the 'filterFunc' and sets the
     * result to 'filtered'
     *
     * essentialy there are always two copies of our 'statuses' data
     */

    var search = new URLSearchParams(location.search);
    if (search.get("filter") === null || search.get("filter") === "false") {
      setFiltered(statuses);
    } else {
      let decoded = JSON.parse(decodeURIComponent(search.get("filters")));
      const filteredStatusesFromFunc = filterFunc(statuses, decoded["filters"]);
      console.log("filtered func: ", filteredStatusesFromFunc);
      setFiltered(filteredStatusesFromFunc);
    }
  }, [location.search, statuses]);

  /*
   * useEffect hook fires when the value in its dependency list changes, in this case 'location.search'
   * it runs the updateCheckedState function when location.search is changed
   *
   * docs: useEffect(someFunctionToRun, arrayOfDependencies or [])
   */
  useEffect(updateCheckedState, [location.search]);

  const resetFilters = () => {
    // closes the modal, and sets the filter value in the url to false
    setModalOpen(false);
    history.push(`?filter=false`);
  };

  const handleModalChange = () => {
    // open or closes the modal by changing 'modalOpen' state
    // if state is true, react renders the filter modal, if not, then it does not get rendered

    if (modalOpen) {
      document.body.style.overflow = "unset";
    } else {
      document.body.style.overflow = "hidden";
    }
    setModalOpen(!modalOpen);
  };

  const handleOnSearchChange = (e) => {
    // when user inputs something into search bar, it gets stored into 'searchInput' state
    setSearchInput(e.target.value);
  };

  const handleFilterApplyFromFilterModal = (filters) => {
    /*
     * triggered by FilterModal's handleApply function,
     * passed down to FilterModal as 'handleSubmit'
     *
     * this function pushes a new url to the page, with the json and url encoded string
     * which is sent from the FilterModal's handleApply function.
     */
    history.push(`?${filters}`);
    setModalOpen(!modalOpen);
  };

  const testProviderFunction = (value) => {
    console.log(value);
  };

  const allFunctions = {
    resetFilters,
    handleModalChange,
    handleOnSearchChange,
    handleSubmit: handleFilterApplyFromFilterModal,
    testProviderFunction,
    modalOpen,
    statuses,
    count,
  };

  return (
    <TestProvider value={allFunctions}>
      <Controls />

      <div className="responsive-table-padding">
        <div className="border-sides rounded-1">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-5">
              {tableHead}
              <tbody>
                {filtered.map((status, i) => {
                  let ip = status.IP_ADDRESS;
                  let name = status.SiteName.toLowerCase();
                  let location = status.LocationName.toLowerCase();
                  if (
                    searchInput !== "" &&
                    ip.indexOf(searchInput) === -1 &&
                    name.indexOf(searchInput.toLowerCase()) === -1 &&
                    location.indexOf(searchInput.toLowerCase()) === -1
                  ) {
                    return null;
                  }
                  const count = i + 1;
                  const data = { ...status, count };
                  return <Row key={i} data={data}></Row>;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TestProvider>
  );
};

export default Table;
