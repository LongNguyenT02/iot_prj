import { LuThermometerSun } from "react-icons/lu";

const LuThermometerSunCom = ({data}) => {
    return <div className="w-1/3 h-full flex items-center justify-center gap-[40px] ">
        <div className="text-black text-center font-[500] text-[26px]">
            <p>{data.lux}lm</p>
            <p>Lux meter</p>
        </div>
        <div className="">
            <LuThermometerSun size={80} color='#535353'/>
        </div>
    </div>;
}
export default LuThermometerSunCom;