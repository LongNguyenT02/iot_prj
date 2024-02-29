import MeasuringTool from "./MeasuringTool";
import { useSelector } from "react-redux";
import { Select } from "antd";
import { useEffect, useState } from "react";

const Thermometer = () => {
    const { Thermometer, currentThermometer } = useSelector(state => state.device);
    
    return <div className="w-1/3 h-full flex items-center justify-center gap-[40px] border-r-[1px] border-r-[#a7a7a7] relative" >
        <div className="absolute w-[40%] top-[15px] left-[15px]">
            <Select options={Thermometer.map(item => ({ label: item.name, value: item.id }))} value={currentThermometer?.id} className="w-full"></Select>
        </div>
        <div className="text-black text-center font-[500] text-[26px]">
            <p>{currentThermometer.value[currentThermometer.value.length - 1]}<sup>o</sup>C</p>
            <p>Thermometer</p>
        </div>
        <div className="h-full py-[20px]">
            <MeasuringTool lowColor="#ff2100" heightColor="#ba1800" maxValue={100} currentValue={currentThermometer.value[currentThermometer.value.length - 1]}></MeasuringTool>
        </div>
    </div>;
}

export default Thermometer;