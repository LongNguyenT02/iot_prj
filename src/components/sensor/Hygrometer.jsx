import MeasuringTool from "./MeasuringTool";
import { useSelector } from "react-redux";
import { Select } from "antd";

const Hygrometer = () => {
    const { Hygrometer, currentHygrometer } = useSelector(state => state.device);

    return <div className="w-1/3 h-full flex items-center justify-center gap-[40px] border-r-[1px] border-r-[#a7a7a7] relative" >
        <div className="absolute w-[40%] top-[15px] left-[15px]">
            <Select options={Hygrometer.map(item => ({ label: item.name, value: item.id }))} value={currentHygrometer?.id} className="w-full"></Select>
        </div>
        <div className="text-black text-center font-[500] text-[26px]">
            <p>{currentHygrometer.value[currentHygrometer.value.length - 1]}%</p>
            <p>Hygrometer</p>
        </div>
        <div className="h-full py-[20px]">
            <MeasuringTool lowColor="#0876BF" heightColor="#004877" maxValue={100} currentValue={currentHygrometer.value[currentHygrometer.value.length - 1]}></MeasuringTool>
        </div>
    </div>;
}

export default Hygrometer;