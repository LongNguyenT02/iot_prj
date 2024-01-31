import { DatePicker, Button, Table } from 'antd';
import { useState } from 'react';
import { formatDate } from "../components/utils/timeUtils";
const { RangePicker } = DatePicker;

const SensorLog = () => {

    const [page, setPage] = useState(1);
    const [paginationSize, setPaginationSize] = useState(10);
    const [totalItemData, setTotalItemData] = useState(4);

    let pageItem =
        (page - 1) * paginationSize + 1 > totalItemData ? page - 1 : page;

    const columns = [
        {
            title: "STT",
            align: "center",
            width: "50px",
            render: (text, record, index) => {
                return (pageItem - 1) * paginationSize + index + 1;
            },
        },
        {
            title: 'Thermometer',
            dataIndex: 'Thermometer',
            sortDirections: ["ascend", "descend", "ascend"],
            sorter: (a, b) => {
                if (a.Thermometer < b.Thermometer) {
                    return -1;
                }
                if (a.Thermometer > b.Thermometer) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: 'Hygrometer',
            dataIndex: 'Hygrometer',
            sortDirections: ["ascend", "descend", "ascend"],
            sorter: (a, b) => {
                if (a.Hygrometer < b.Hygrometer) {
                    return -1;
                }
                if (a.Hygrometer > b.Hygrometer) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: 'Lux Meter',
            dataIndex: 'Lux',
            sortDirections: ["ascend", "descend", "ascend"],
            sorter: (a, b) => {
                if (a.Lux < b.Lux) {
                    return -1;
                }
                if (a.Lux > b.Lux) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: 'Time',
            dataIndex: 'Time',
            sorter: (a, b) => {
                if (a.time < b.time) {
                    return -1;
                }
                if (a.time > b.time) {
                    return 1;
                }
                return 0;
            },
            sortDirections: ["ascend", "descend", "ascend"],
        },
    ];

    const data = [
        {
            key: '1',
            Thermometer: '30',
            Hygrometer: 32,
            Lux: '50',
            Time: formatDate(new Date())
        },
        {
            key: '2',
            Thermometer: '28',
            Hygrometer: 42,
            Lux: '80',
            Time: formatDate(new Date())
        },
        {
            key: '3',
            Thermometer: '25',
            Hygrometer: 32,
            Lux: '70',
            Time: formatDate(new Date())
        },
        {
            key: '4',
            Thermometer: '27',
            Hygrometer: 60,
            Lux: '70',
            Time: formatDate(new Date())
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return <div className='h-[100vh] p-[10px] bg-white'>
        <div className='flex gap-[10px]'>
            <RangePicker />
            <Button type="primary" className='bg-[#1677ff]'>Search</Button>
        </div>
        <div className='mt-[10px]'>
            <Table columns={columns} dataSource={data} onChange={onChange} scroll={{ x: "scroll" }}
                size={"small"} />;
        </div>
    </div>
}

export default SensorLog;