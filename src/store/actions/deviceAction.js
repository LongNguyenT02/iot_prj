import actionTypes from "./actionTypes";

export const fetch_devices = (data) => {
  return {
    type: actionTypes.FETCH_DEVICES,
    devices: data.devices,
    current: data.current,
  };
};

export const change_current_device = (currentDevice, devices) => {
  return {
    type: actionTypes.CHANGE_CURRENT_DEVICE,
    currentDevice,
    devices,
  };
};

export const update_device_value = (devices, created_at) => {
  return {
    type: actionTypes.UPDATE_DEVICE_VALUE,
    devices,
    created_at:created_at,
  };
};
