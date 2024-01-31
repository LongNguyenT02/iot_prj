const MeasuringTool = ({ lowColor, heightColor, maxValue, currentValue }) => {
    return <div className="h-full flex items-center justify-center flex-col ">
        <div className="w-[40px] h-[80%] border-[#A6A6A6] border-[4px] rounded-[20px] border-b-none bg-white translate-y-[25px] overflow-hidden">
            <div className="w-full h-full border-[#fff] border-[4px] bg-white relative " >
                <div className="absolute bottom-0 left-0 w-full  rounded-[20px]" style={{ height:currentValue/maxValue*100+0.2+"%", backgroundColor: currentValue>maxValue/2?heightColor:lowColor,borderRadius: currentValue === maxValue ? '20px' : '0' }}></div>
            </div>
        </div>
        <div className="w-[65px] h-[65px] border-[#A6A6A6] border-[4px] rounded-[50%] ">
            <div className="w-full h-full border-[#fff] border-[4px] rounded-[50%] bg-white relative">
                <div className="absolute top-0 left-0 w-full h-full rounded-[50%]" style={{ backgroundColor: currentValue>maxValue/2?heightColor:lowColor }}></div>
            </div>
        </div>
    </div>
}

export default MeasuringTool;