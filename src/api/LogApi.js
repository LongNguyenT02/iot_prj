import axiosClients from "../AxiosClient";
const LogApi = {
  statusLog: (data) => {
    const url = `/logs/getStatusLog?page=${data.page}&size=${data.size}&direction=${data.direction}&filterStatus=${data.filterStatus}&filterSensor=${data.filterSensor}&startDate=${data.startDate}&endDate=${data.endDate}`;
    return axiosClients.get(url);
  },
  valueLog: (data) => {
    const url = `/logs/getValueLog?page=${data.page}&size=${data.size}&sort=${data.sortField}&direction=${data.direction}&filterSensor=${data.filterSensor}&startDate=${data.startDate}&endDate=${data.endDate}`;
    return axiosClients.get(url);
  },
};

export default LogApi;
