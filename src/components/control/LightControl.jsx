
import { FaRegLightbulb, FaLightbulb } from "react-icons/fa";
import Switch from "react-switch";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "antd";
import { change_current_device } from "../../store/actions/deviceAction";
import DeviceApi from "../../api/DeviceApi";

const LightControl = () => {
    const [activeStatus, setActiveStatus] = useState(false);
    const dispatch = useDispatch();
    const { Light, currentLight } = useSelector(state => { return state.device });

    async function handleChange(checked) {
        try {
            const res = await DeviceApi.changeDeviceStatus({ ...currentLight, status: checked ? 1 : 0 });
            dispatch(change_current_device(({ currentLight: res }), {Light:Light.map(item => {
                if (item.id === res.id) return res;
                else return item;
            })}))
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setActiveStatus(currentLight?.status === 1);
    }, [currentLight, currentLight?.status])

    return <div className="flex items-center justify-center gap-[60px] flex-1 relative">
        <div className="absolute w-[40%] top-[15px] left-[0px]">
            <Select options={Light.map(item => ({ label: item.name, value: item.id }))} value={currentLight?.id} className="w-full"
                onChange={(e) => {
                    dispatch(change_current_device(({ currentLight: Light.find(item => item.id === e) })))
                }}
            ></Select>
        </div>
        <div>
            <p className="text-black text-center font-[500] text-[26px]">Light Controller</p>
        </div>
        <div className="flex justify-center items-center flex-col gap-[10px]">
            {activeStatus ? <FaLightbulb size={80} color={'#ffdf00'} /> : <FaRegLightbulb size={80} />}
            <Switch
                checked={activeStatus}
                onChange={handleChange}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                id="material-switch"></Switch>
        </div>
    </div>
}
export default LightControl;