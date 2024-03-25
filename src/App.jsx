import { Routes, Route } from "react-router-dom";
import Public from "./pages/Public";
import Dashboard from "./pages/Dashboard";
import SensorLog from "./pages/SensorLog";
import StatusLog from "./pages/StatusLog";
import ProfilePage from "./pages/ProfilePage";

import DeviceApi from './api/DeviceApi';
import { useDispatch } from "react-redux";
import { fetch_devices, update_device_value } from "./store/actions/deviceAction";

import { useEffect } from "react";

import SockJS from "sockjs-client";
import { over } from "stompjs";

let stompClient = null;
function App() {
  const dispatch = useDispatch();

  const fetchDevices = async () => {
    try {
      const res = await DeviceApi.getAllDevices();
      const devicesByType = res.reduce((acc, device) => {
        acc[device.type] = [...(acc[device.type] || []), device];
        return acc;
      }, {});

      const currentDevices = JSON.parse(localStorage.getItem("persist:device")) || {
        currentThermometer: null,
        currentHygrometer: null,
        currentLux: null,
        currentLight: null,
        currentFan: null
      };
      const current = {
        currentThermometer: JSON.parse(currentDevices.currentThermometer) || (devicesByType["Thermometer"] && devicesByType["Thermometer"][0]),
        currentHygrometer: JSON.parse(currentDevices.currentHygrometer) || (devicesByType["Hygrometer"] && devicesByType["Hygrometer"][0]),
        currentLux: JSON.parse(currentDevices.currentLux) || (devicesByType["Lux"] && devicesByType["Lux"][0]),
        currentLight: JSON.parse(currentDevices.currentLight) || (devicesByType["Light"] && devicesByType["Light"][0]),
        currentFan: JSON.parse(currentDevices.currentFan) || (devicesByType["Fan"] && devicesByType["Fan"][0]),
      };

      dispatch(fetch_devices({
        devices: devicesByType,
        current,
      }));

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const connect = () => {
    let Sock = new SockJS(
      `http://localhost:8080/ws`
    );
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe(
      "/topic/1/deviceLogs",
      onNotificationMessage
    );
  };
  const onError = (err) => {
    console.log(err);
  };

  const onNotificationMessage = (payload) => {
    const devicesByType = JSON.parse(payload.body).data.reduce((acc, device) => {
      acc[device.sensor.type] = [...(acc[device.sensor.type] || []), device];
      return acc;
    }, {});
    dispatch(update_device_value({
      devices: devicesByType,
    }, JSON.parse(payload.body).created_at));
  };

  useEffect(() => {
    connect();
    return () => {
      if (stompClient && stompClient?.connected) {
        stompClient?.disconnect();
      }
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Public></Public>}>
        <Route path="" element={<Dashboard></Dashboard>}></Route>
        <Route path="sensor" element={<SensorLog></SensorLog>}></Route>
        <Route path="status" element={<StatusLog></StatusLog>}></Route>
        <Route path="profile" element={<ProfilePage></ProfilePage>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
