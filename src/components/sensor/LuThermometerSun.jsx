import { LuThermometerSun } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Select } from "antd";

const LuThermometerSunCom = () => {
    const { Lux, currentLux } = useSelector(state => state.device);

    return <div className="w-1/3 h-full flex items-center justify-center gap-[40px] relative">
        <div className="absolute w-[40%] top-[15px] left-[15px]">
            <Select options={Lux.map(item => ({ label: item.name, value: item.id }))} value={currentLux?.id} className="w-full"></Select>
        </div>
        <div className="text-black text-center font-[500] text-[26px]">
            <p>{currentLux.value[currentLux.value.length - 1]}lm</p>
            <p>Lux meter</p>
        </div>
        <div className="">
            <LuThermometerSun size={80} color='#535353' />
        </div>
    </div>;
}
export default LuThermometerSunCom;