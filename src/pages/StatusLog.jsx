import { DatePicker, Button, Table } from 'antd';
import { useState } from 'react';
import { formatDate } from "../components/utils/timeUtils";
const { RangePicker } = DatePicker;

const StatusLog = () => {

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
            title: 'Device',
            dataIndex: 'Fan',
            filters: [
                {
                  text: 'On',
                  value: 'On',
                },
                {
                  text: 'Off',
                  value: 'Off',
                },
              ],
              onFilter: (value, record) => record.Fan === value,
        },
        {
            title: 'Status',
            dataIndex: 'Light',
            filters: [
                {
                  text: 'On',
                  value: 'On',
                },
                {
                  text: 'Off',
                  value: 'Off',
                },
              ],
              onFilter: (value, record) => record.Fan === value,
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
            Fan: 'Fan01',
            Light: "Off",
            Time: formatDate(new Date())
        },
        {
            key: '2',
            Fan: 'Fan01',
            Light: "Off",
            Time: formatDate(new Date())
        },
        {
            key: '3',
            Fan: 'Light02',
            Light: "On",
            Time: formatDate(new Date())
        },
        {
            key: '4',
            Fan: 'Light02',
            Light: "On",
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
            <Table columns={columns} dataSource={data} onChange={onChange} />;
        </div>
    </div>
}

export default StatusLog;