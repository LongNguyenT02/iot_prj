import {Routes,Route} from "react-router-dom";
import Public from "./pages/Public";
import Dashboard from "./pages/Dashboard";
import SensorLog from "./pages/SensorLog";
import StatusLog from "./pages/StatusLog";
import ProfilePage from "./pages/ProfilePage";
function App() {
 
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
