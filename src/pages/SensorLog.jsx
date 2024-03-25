import { DatePicker, Button, Table, Select } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const { RangePicker } = DatePicker;

const StyleSensorLog = styled("div")`

  .ant-select-single{
    height: auto !important;
  }

 
  .device-select>.ant-select-selector>.ant-select-selection-item,
  .device-select>.ant-select-selector>.ant-select-selection-placeholder {
    position: absolute;
    left: 10px;
  }

  .device-select>.ant-select-selector {
    overflow: hidden;
    padding: 0 24px 0 4px;  
 
  }

  .ant-select-selection-overflow {
    height: 38px !important;
    overflow-x: auto !important;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .ant-select-selection-overflow::-webkit-scrollbar {
    display: none;
  }

`;
const SensorLog = () => {

    const [page, setPage] = useState(1);
    const [paginationSize, setPaginationSize] = useState(10);
    const [totalItemData, setTotalItemData] = useState(4);
    const [sortDirections, setSortDirections] = useState("asc")
    const [sortField, setSortField] = useState("")
    const [selectedDevice, setSelectedDevice] = useState([JSON.stringify({ id: "", name: "All" })]);
    const [dataColumn, setDataColumn] = useState([]);

    const { Lux, Hygrometer, Thermometer } = useSelector(state => state.device);

    useEffect(() => {
        let pageItem =
            (page - 1) * paginationSize + 1 > totalItemData ? page - 1 : page;
        let deviceColumn = []
        if (selectedDevice.length === 0 || JSON.parse(selectedDevice[0]).name === 'All') {
            deviceColumn = [...Lux, ...Hygrometer, ...Thermometer].map(dv => ({
                title: dv.name,
                dataIndex: dv.id,
                sortDirections: ["ascend", "descend", "ascend"],
                sorter: (a, b) => {
                    return;
                },
            }))
        }
        else deviceColumn = selectedDevice.map(device => {
            const parseDevice = JSON.parse(device);
            return {
                title: parseDevice.name,
                dataIndex: parseDevice.id,
                sortDirections: ["ascend", "descend", "ascend"],
                sorter: (a, b) => {
                    return;
                },
            }
        })

        const columns = [
            {
                title: "STT",
                align: "center",
                width: "50px",
                render: (text, record, index) => {
                    return (pageItem - 1) * paginationSize + index + 1;
                },
            },
            ...deviceColumn,
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
        setDataColumn(columns)
    }, [page, paginationSize, sortDirections, sortField, selectedDevice])

    const data = [
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        setSortDirections(sorter.order === 'ascend' ? "ASC" : "DESC");
        setSortField(sorter.column.title);
    };

    return <div className=' p-[10px] bg-white'>
        <StyleSensorLog>
            <div className='flex gap-[10px] items-center h-[40px]'>
                <Select
                    mode="multiple"
                    allowClear
                    style={{
                        width: '300px'
                    }}
                    placeholder="Select device"
                    className={'device-select'}
                    value={selectedDevice}
                    onChange={(e) => {
                        if (e.length === 0) {
                            setSelectedDevice([]);
                        }
                        else if (JSON.parse(e[e.length - 1]).id === '') {
                            setSelectedDevice([JSON.stringify({ id: "", name: "All" })]);
                        } else if (e.includes(JSON.stringify({ id: "", name: "All" })) && e.length > 1) {
                            setSelectedDevice(e.filter((dt) => dt !== JSON.stringify({ id: "", name: "All" })));
                        } else {
                            setSelectedDevice(e);
                        }
                    }}
                    options={[{
                        label: 'All',
                        value: JSON.stringify({ id: "", name: "All" })
                    },
                    ...[...Lux, ...Hygrometer, ...Thermometer].map(dv => ({ label: dv.name, value: JSON.stringify({ id: dv.id, name: dv.name }) }))
                    ]}
                />
                <RangePicker className='h-full' />
                <Button type="primary" className='bg-[#1677ff] h-full'>Search</Button>
            </div>
            <div className='mt-[10px]'>
                <Table columns={dataColumn}
                    dataSource={data}
                    rowKey={() => {
                        let result = "";
                        const characters =
                            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                        for (let i = 0; i < 50; i++) {
                            const randomIndex = Math.floor(Math.random() * characters.length);
                            result += characters?.charAt(randomIndex);
                        }
                        return result;
                    }}
                    onChange={onChange}
                    pagination={{
                        onChange(current, pageSize) {
                            setPage(current);
                            setPaginationSize(pageSize);
                        },
                        defaultPageSize: paginationSize,
                        showSizeChanger: true,
                        pageSizeOptions: ["5", "10", "20", "30"],
                        total: totalItemData,
                    }} />
            </div>
        </StyleSensorLog>
    </div>
}

export default SensorLog;