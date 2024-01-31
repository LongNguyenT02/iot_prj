import MeasuringTool from "./MeasuringTool";
const Hygrometer = ({data}) => {

    return <div className="w-1/3 h-full flex items-center justify-center gap-[40px] border-r-[1px] border-r-[#a7a7a7]" >
        <div className="text-black text-center font-[500] text-[26px]">
            <p>{data.water}%</p>
            <p>Hygrometer</p>
        </div>
        <div className="h-full py-[20px]">
            <MeasuringTool lowColor="#0876BF" heightColor="#004877" maxValue={100} currentValue={data.water}></MeasuringTool>
        </div>
    </div>;
}

export default Hygrometer;