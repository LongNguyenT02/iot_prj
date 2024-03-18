import axiosClients from "../AxiosClient";
const LogApi = {
  statusLog: (data) => {
    const url = `/logs/getStatusLog?page=${data.page}&size=${data.size}&direction=${data.direction}&filterStatus=${data.filterStatus}&filterSensor=${data.filterSensor}&startDate=${data.startDate}&endDate=${data.endDate}`;
    return axiosClients.get(url);
  },
};

export default LogApi;
