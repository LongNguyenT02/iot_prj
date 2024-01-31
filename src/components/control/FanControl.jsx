import { PiFanDuotone } from "react-icons/pi";
import Switch from "react-switch";
import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledFan = styled('div')`
.rotate {
    animation: rotate 2s linear infinite;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
`

const FanControl = () => {
    const [activeStatus, setActiveStatus] = useState(false);
    const [rotation, setRotation] = useState(0);

    function handleChange(checked) {
        setActiveStatus(checked);
    }

    useEffect(() => {
        let intervalId;

        if (activeStatus) {
            intervalId = setInterval(() => {
                setRotation(prevRotation => (prevRotation + 5) % 360);
            }, 16);
        } else {
            clearInterval(intervalId);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [activeStatus]);

    return <StyledFan className="flex items-center justify-center gap-[60px] flex-1 border-b-[1px] border-b-[#a7a7a7]">
        <div>
            <p className="text-black text-center font-[500] text-[26px]">Fan Controller</p>
        </div>
        <div className="flex justify-center items-center flex-col gap-[10px]">
            <div className={`fan-icon `} style={{ transform: `rotate(${rotation}deg)` }}>

                <PiFanDuotone size={80} />
            </div>
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
    </StyledFan>
}
export default FanControl;