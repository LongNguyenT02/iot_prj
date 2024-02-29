import actionTypes from "../actions/actionTypes";

const initState = {
  Thermometer: [],
  Hygrometer: [],
  Lux: [],
  Light: [],
  Fan: [],
  currentThermometer: null,
  currentHygrometer: null,
  currentLux: null,
  currentLight: null,
  currentFan: null,
};

const deviceReducer = (state = initState, action) => {

  let newThermometer, newHygrometer, newLux;
  newThermometer = [...state.Thermometer];
  newHygrometer = [...state.Hygrometer];
  newLux = [...state.Lux];
  let newCurrentThermometer = JSON.parse(JSON.stringify(state.currentThermometer));
  let newCurrentHygrometer = state.currentHygrometer;
  let newCurrentLux = state.currentLux;

  switch (action.type) {
    case actionTypes.FETCH_DEVICES:
      return {
        ...state,
        ...action.devices,
        ...action.current,
      };
    case actionTypes.CHANGE_CURRENT_DEVICE:
      return {
        ...state,
        ...action.devices,
        ...action.currentDevice,
      };
    case actionTypes.UPDATE_DEVICE_VALUE:
      if (action.devices.devices.Thermometer) {
        action.devices.devices.Thermometer.forEach((data) => {
          newThermometer.forEach((dt) => {
            if (dt.name === data.sensor.name) {
              if (dt.value) {
                dt.value.push(data.value);
                dt.created_at.push(action.created_at);
              } else {
                dt.value = [data.value];
                dt.created_at = [action.created_at];
              }
            }
            if (dt.id === newCurrentThermometer.id) {
              newCurrentThermometer = dt;
            }
          });
        });
      }

      if (action.devices.devices.Hygrometer) {
        action.devices.devices.Hygrometer.forEach((data) => {
          newHygrometer.forEach((dt) => {
            if (dt.name === data.sensor.name) {
              if (dt.value) {
                dt.value.push(data.value);
                dt.created_at.push(action.created_at);
              } else {
                dt.value = [data.value];
                dt.created_at = [action.created_at];
              }
            }
            if (dt.id === newCurrentHygrometer.id) {
              newCurrentHygrometer = dt;
            }
          });
        });
      }
      if (action.devices.devices.Lux) {
        action.devices.devices.Lux.forEach((data) => {
          newLux.forEach((dt) => {
            if (dt.name === data.sensor.name) {
              if (dt.value) {
                dt.value.push(data.value);
                dt.created_at.push(action.created_at);
              } else {
                dt.value = [data.value];
                dt.created_at = [action.created_at];
              }
            }
            if (dt.id === newCurrentLux.id) {
              newCurrentLux = dt;
            }
          });
        });
      }

      return {
        ...state,
        Thermometer: newThermometer,
        Hygrometer: newHygrometer,
        Lux: newLux,
        currentThermometer: newCurrentThermometer,
        currentHygrometer: newCurrentHygrometer,
        currentLux: newCurrentLux,
      };
    default:
      return state;
  }
};

export default deviceReducer;
