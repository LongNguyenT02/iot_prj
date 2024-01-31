
import { FaRegLightbulb,FaLightbulb  } from "react-icons/fa";
import Switch from "react-switch";
import { useState } from "react";

const LightControl = () => {
    const [activeStatus, setActiveStatus] = useState(false);

    function handleChange(checked) {
        setActiveStatus(checked);
    }

    return <div className="flex items-center justify-center gap-[60px] flex-1 ">
        <div>
            <p className="text-black text-center font-[500] text-[26px]">Light Controller</p>
        </div>
        <div className="flex justify-center items-center flex-col gap-[10px]">
            {activeStatus?<FaLightbulb size={80} color={'#ffdf00'}/> : <FaRegLightbulb size={80}/>}
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