import {
    DesktopOutlined,
    PieChartOutlined,
    ApiOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useLayoutEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
const { Header } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Dashboard', '/', <PieChartOutlined />),
    getItem("Sensor's Log", '/sensor', <DesktopOutlined />),
    getItem("Status's Log", '/status', <ApiOutlined />),
    getItem('Profile', '/profile', <UserOutlined />),
];
const Public = () => {
    const navigate = useNavigate();

    const onClick = (e) => {
        const flattenArr = items.flatMap((item) =>
            item.children ? item.children : [item]
        );
        const selectedItem = flattenArr.find((item) => item.key === e.key);
        if (selectedItem) {
            navigate(e.key);
            setSelectedKeys([e.key])

        }
    };
    const location = useLocation().pathname;
    const [selectedKeys, setSelectedKeys] = useState([location]);
   
    return (
        <Layout style={{
            minHeight: '100vh',
        }}>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
                className='header'
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={selectedKeys}
                    items={items}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                    onClick={onClick}
                />
            </Header>
            <Layout>
                <Outlet></Outlet>
            </Layout>
        </Layout>
    );
};
export default Public;