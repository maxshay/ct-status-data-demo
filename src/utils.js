const filterFunc = (statuses, filters) => {
  let filteredStatuses = statuses;
  Object.keys(filters).forEach((filterType) => {
    if (filters[filterType] && filters[filterType].length > 0) {
      if (filterType === "network-status") {
        filteredStatuses = filteredStatuses.filter((status) =>
          filters[filterType].includes(status.NetworkStatus)
        );
      }
      if (filterType === "recording-status") {
        filteredStatuses = filteredStatuses.filter((status) =>
          filters[filterType].includes(status.RecordingStatus)
        );
      }
      if (filterType === "model-type") {
        filteredStatuses = filteredStatuses.filter((status) =>
          filters[filterType].includes(status.ADR_Model)
        );
      }
    }
  });
  return filteredStatuses;
};

export { filterFunc };
