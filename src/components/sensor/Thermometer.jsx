import MeasuringTool from "./MeasuringTool";
const Thermometer = ({ data }) => {

    return <div className="w-1/3 h-full flex items-center justify-center gap-[40px] border-r-[1px] border-r-[#a7a7a7]" >
        <div className="text-black text-center font-[500] text-[26px]">
            <p>{data.hot}<sup>o</sup>C</p>
            <p>Thermometer</p>
        </div>
        <div className="h-full py-[20px]">
            <MeasuringTool lowColor="#ff2100" heightColor="#ba1800" maxValue={100} currentValue={data.hot}></MeasuringTool>
        </div>
    </div>;
}

export default Thermometer;