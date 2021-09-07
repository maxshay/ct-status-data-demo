import { useState, useContext } from "react";
import { TestContext } from "../context";

const FilterModal = () => {
  const { modalOpen, handleSubmit, handleModalChange } =
    useContext(TestContext);

  /*
   * These State values below hold the filter states the user selects and later
   * submits to the table page.
   *
   * example filter state (for networkFilters): ["ACTIVE", "DOWN"]
   */
  const [networkFilters, setNetworkFilters] = useState([]);
  const [recordingFilters, setRecordingFilters] = useState([]);
  const [modelFilters, setModelFilters] = useState([]);

  const handleApply = () => {
    /*
     * When the user clicks the apply button in the filters modal, this function gathers
     * all the filters and encodes them into a string for the table component to decode
     * and apply those filters
     *
     * If no filters are selected (in state) then function sends a "filter=false" to the
     * Table page indicating there are no filters
     */

    let filters;
    document.body.style.overflow = "unset";
    if (
      networkFilters.length === 0 &&
      recordingFilters.length === 0 &&
      modelFilters.length === 0
    ) {
      handleSubmit("filter=false");
      return;
    } else {
      filters = {
        filters: {
          "network-status": networkFilters,
          "recording-status": recordingFilters,
          "model-type": modelFilters,
        },
      };

      let str = encodeURIComponent(JSON.stringify(filters));
      handleSubmit("filter=true&filters=" + str);
    }
  };

  const handleChange = (e) => {
    /*
     * This function is ran when the user clicks on a checkmark
     * it checks if the checkmark is checked or not, then
     * proceeds to add or remove the filter value from the selected
     * filter state 'networkFilters' or 'recordingFilters' or 'modelFilters'
     *
     * The event is tied to the checkmark, and each checkmark has an attribute
     * called "data-filter-type" this is how the function knows what filter category
     * to assign the value to
     */
    let filterValue = e.target.value;
    let filterType = e.target.getAttribute("data-filter-type");

    if (e.target.checked) {
      if (filterType === "network") {
        let updatedFilters = [...networkFilters, filterValue];
        setNetworkFilters(updatedFilters);
      }
      if (filterType === "recording") {
        let updatedFilters = [...recordingFilters, filterValue];
        setRecordingFilters(updatedFilters);
      }
      if (filterType === "model") {
        let updatedFilters = [...modelFilters, filterValue];
        setModelFilters(updatedFilters);
      }
    } else {
      if (filterType === "network") {
        let array = [...networkFilters];
        let index = array.indexOf(e.target.value);
        if (index !== -1) {
          array.splice(index, 1);
          setNetworkFilters(array);
        }
      }
      if (filterType === "recording") {
        let array = [...recordingFilters];
        let index = array.indexOf(e.target.value);
        if (index !== -1) {
          array.splice(index, 1);
          setRecordingFilters(array);
        }
      }
      if (filterType === "model") {
        let array = [...modelFilters];
        let index = array.indexOf(e.target.value);
        if (index !== -1) {
          array.splice(index, 1);
          setModelFilters(array);
        }
      }
    }
  };

  /*
   * Below is the html and state markup that gets rendered to the screen
   * This is the filter modal that open when clicking the 'Set Filters' Button
   *
   */
  return (
    <div
      className={`filterModal-overlay`}
      style={modalOpen ? { display: "block" } : { display: "none" }}
    >
      <div className="filter-modal">
        <div className="filter-modal__header d-flex justify-content-between align-middle">
          <button className="btn ps-0" disabled>
            <h6 className="m-0 align-middle">Filter Options</h6>
          </button>
          <button className="btn" onClick={handleModalChange}>
            x
          </button>
        </div>

        <div className="filter-modal__body">
          <div id="accordion">
            <div className="filter-modal__option-container">
              <div className="filter-modal__option-title">Network Status</div>
              <div className="filter-modal__option-body">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="ACTIVE"
                    name="0"
                    onChange={handleChange}
                    data-filter-type="network"
                  />
                  <label htmlFor="inlineCheckbox1" className="form-check-label">
                    Active
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="DOWN"
                    name="1"
                    onChange={handleChange}
                    data-filter-type="network"
                  />
                  <label htmlFor="inlineCheckbox1" className="form-check-label">
                    Down
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="UNKNOWN"
                    name="2"
                    onChange={handleChange}
                    data-filter-type="network"
                  />
                  <label htmlFor="inlineCheckbox1" className="form-check-label">
                    Unknown
                  </label>
                </div>
              </div>
            </div>

            <div className="filter-modal__option-container">
              <div className="filter-modal__option-title">Recording Status</div>
              <div className="filter-modal__option-body">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="RECORDING"
                    name="3"
                    onChange={handleChange}
                    data-filter-type="recording"
                  />
                  <label htmlFor="inlineCheckbox1" className="form-check-label">
                    Recording
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="IDLE"
                    name="4"
                    onChange={handleChange}
                    data-filter-type="recording"
                  />
                  <label htmlFor="inlineCheckbox1" className="form-check-label">
                    Idle
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="UNKNOWN"
                    name="5"
                    onChange={handleChange}
                    data-filter-type="recording"
                  />
                  <label htmlFor="inlineCheckbox1" className="form-check-label">
                    Unknown
                  </label>
                </div>
              </div>
            </div>

            <div className="filter-modal__option-container">
              <div className="filter-modal__option-title">Model</div>
              <div className="filter-modal__option-body">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="Model 1000"
                    name="6"
                    onChange={handleChange}
                    data-filter-type="model"
                  />
                  <label htmlFor="inlineCheckbox1" className="form-check-label">
                    Model 1000
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="Model 2000"
                    name="7"
                    onChange={handleChange}
                    data-filter-type="model"
                  />
                  <label htmlFor="inlineCheckbox1" className="form-check-label">
                    Model 2000
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="Model 3000"
                    name="8"
                    onChange={handleChange}
                    data-filter-type="model"
                  />
                  <label htmlFor="inlineCheckbox1" className="form-check-label">
                    Model 3000
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="filter-modal__footer d-flex justify-content-end">
          <button className="filter-button" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
