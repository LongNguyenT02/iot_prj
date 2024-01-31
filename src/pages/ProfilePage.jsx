import bgImg from "../assets/bg.jpg";
import { Tabs } from "antd";
import Profile from "../components/profile/Profile";
import Notification from "../components/profile/Notification";
const ProfilePage = () => {
    const items = [
        {
            key: '1',
            label: 'Profile',
            children: <Profile></Profile>,
        },
        {
            key: '2',
            label: 'Notifications',
            children: <Notification></Notification>,
        },

    ];

    const onChange = (key) => {
        console.log(key);
    };

    return <>
        <div className="h-[300px] w-full">
            <img src={bgImg} alt="bg" className="h-full object-cover w-full" />
        </div>
        <div className="translate-y-[-30px] px-[40px] flex gap-[20px] items-center">
            <div className="w-[160px] h-[160px] rounded-[50%] overflow-hidden border-[4px] shadow-2xl border-white bg-white">
                <img src={bgImg} alt="avt" className="object-cover w-full h-full" />
            </div>
            <div className="text-black">
                <p className="font-[600] text-[32px]">Nguyễn Thành Long</p>
                <p className="font-[400]">LongNT.B20PT119@stu.ptit.edu.vn</p>
            </div>
        </div>
        <div className="px-[40px]">
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    </>
}

export default ProfilePage;