import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import deviceReducer from "./deviceReducer";
import { combineReducers } from "redux";

const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

const deviceConfig = {
  ...commonConfig,
  key: "device",
  whitelist: [
    "currentThermometer",
    "currentHygrometer",
    "currentLux",
    "currentLight",
    "currentFan",
  ],
};

const rootReducer = combineReducers({
  device: persistReducer(deviceConfig, deviceReducer),
});

export default rootReducer;
