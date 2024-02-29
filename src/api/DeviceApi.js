import axiosClients from "../AxiosClient";
const DeviceApi = {
  getAllDevices: () => {
    const url = `/device/getAllDevices`;
    return axiosClients.get(url);
  },
  changeDeviceStatus:(data)=>{
    const url=`/device/changeDeviceStatus`;
    return axiosClients.put(url,data);
  }
};

export default DeviceApi;
