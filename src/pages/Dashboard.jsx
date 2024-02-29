import { useEffect, useState, useRef } from 'react';
import Thermometer from '../components/sensor/Thermometer';
import Hygrometer from '../components/sensor/Hygrometer';
import LuThermometerSunCom from '../components/sensor/LuThermometerSun';
import Chart from '../components/chart/Chart';
import FanControl from '../components/control/FanControl';
import LightControl from '../components/control/LightControl';

const Dashboard = () => {
    const [chartContainerHeight, setChartContainerHeight] = useState(0);
    const [chartWidth, setChartWidth] = useState('70%');
    const upperSectionRef = useRef(null);

    useEffect(() => {
        const calculateChartContainerHeight = () => {
            const windowHeight = window.innerHeight;
            const upperSectionHeight = upperSectionRef.current.clientHeight;
            const headerHeight = document.querySelector('header').clientHeight;
            const padding = 40;
            const chartContainerHeight = windowHeight - upperSectionHeight - padding - headerHeight;

            setChartContainerHeight(chartContainerHeight);
        };
        const calculateChartWidth = () => {
            setChartWidth(`${upperSectionRef.current.clientWidth * 66.6666 / 100 + 10}px`);
        };

        calculateChartContainerHeight();
        calculateChartWidth();

        window.addEventListener('resize', calculateChartContainerHeight);
        window.addEventListener('resize', calculateChartWidth);

        return () => {
            window.removeEventListener('resize', calculateChartContainerHeight);
            window.removeEventListener('resize', calculateChartWidth);
        };
    }, []);

    return <div className='p-[10px]'>
        <div ref={upperSectionRef} className='h-[30vh] shadow-xl rounded-[20px] overflow-hidden flex bg-white'>
            <Thermometer ></Thermometer>
            <Hygrometer ></Hygrometer>
            <LuThermometerSunCom ></LuThermometerSunCom>
        </div>
        <div style={{ height: `${chartContainerHeight}px` }} className=' shadow-xl rounded-[20px] bg-white mt-[20px] p-[10px] flex gap-[10px]'>
            <div className='h-full' style={{ width: chartWidth }}>
                <Chart ></Chart>
            </div>
            <div className='flex flex-col justify-center items-center flex-auto'>
                <FanControl ></FanControl>
                <LightControl ></LightControl>
            </div>
        </div>
    </div>
}

export default Dashboard;