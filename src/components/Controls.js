import { useContext } from "react";
import { TestContext } from "../context";
import Summary from "./Summary";
import FilterModal from "./FilterModal";

// icons
import InfoIcon from "../img/information.svg";

const Controls = () => {
  const {
    handleOnSearchChange,
    statuses,
    searchInput,
    modalOpen,
    count,
    resetFilters,
    handleModalChange,
  } = useContext(TestContext);

  return (
    <div className="sect-2 bg-white">
      <nav className="navbar d-flex justify-content-start pt-4 pb-4 secondary-nav">
        <div className="col-12 col-md-4">
          <div className="d-flex" style={{ flexFlow: "unset" }}>
            <input
              className="search-custom"
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => handleOnSearchChange(e)}
            />
            <div className="infoicon-container">
              <img src={InfoIcon} alt="info" />
              <div className="info-popover bg-white shadow">
                Search entries by i.p. address, Site Name or Location Name
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 text-center">
          <div>
            <strong>{count}</strong> Current Devices Listed |{" "}
            <button className="summary-t link-button" type="button">
              summary
              <Summary data={statuses} />
            </button>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <ul className="w-100 d-flex justify-content-end">
            <li className="nav-item me-3">
              <button className="link-button" onClick={resetFilters}>
                Clear Filters
              </button>
            </li>
            <li className="nav-item">
              <button
                className="link-button"
                onClick={handleModalChange}
                style={modalOpen ? { opacity: 0, userSelect: "none" } : {}}
              >
                <span className="d-inline-block">Set Filters</span>
              </button>
            </li>
          </ul>
          <FilterModal />
        </div>
      </nav>
    </div>
  );
};

export default Controls;
