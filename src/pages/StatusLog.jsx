import { DatePicker, Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { formatDate } from "../components/utils/timeUtils";
import LogApi from "../api/LogApi";
import { useSelector } from 'react-redux';

const { RangePicker } = DatePicker;

const StatusLog = () => {

    const [page, setPage] = useState(1);
    const [paginationSize, setPaginationSize] = useState(10);
    const [totalItemData, setTotalItemData] = useState(0);
    const [sortDirections, setSortDirections] = useState("asc")
    const [filterStatus, setFilterStatus] = useState([]);
    const [filterSensor, setFilterSensor] = useState([]);
    const [searchDate, setSearchDate] = useState([]);
    const { Light, Fan } = useSelector(state => state.device);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    const fetchData = async () => {
        try {
            let startDate = searchDate[0] ? searchDate[0] : "";
            let endDate = searchDate[1] ? searchDate[1] : "";

            const res = await LogApi.statusLog({
                page: page - 1,
                size: paginationSize,
                direction: sortDirections,
                filterStatus,
                filterSensor,
                startDate,
                endDate
            })
            setData(res.content);
            setTotalItemData(res.count);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchData().then();
    }, [page, paginationSize, sortDirections, filterSensor, filterStatus])

    useEffect(() => {
        let pageItem =
            (page - 1) * paginationSize + 1 > totalItemData ? page - 1 : page;

        const dataColumns = [
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
                filters: [
                    ...Light.map(dv => ({ text: dv.name, value: dv.name })),
                    ...Fan.map(dv => ({ text: dv.name, value: dv.name })),
                ],
                onFilter: (value, record) => record.sensor.name === value,
                render: (_, record) => {
                    return <p>{record.sensor.name}</p>
                },
                filterSearch: true,
            },
            {
                title: 'Status',
                dataIndex: 'status',
                filters: [
                    {
                        text: 'On',
                        value: '1',
                    },
                    {
                        text: 'Off',
                        value: '0',
                    },
                ],
                onFilter: (value, record) => record.status + '' === value,
            },
            {
                title: 'Time',
                dataIndex: 'createdAt',
                sorter: (a, b) => {
                    return;
                },
                sortDirections: ["ascend", "descend", "ascend"],
                render: (_, record) => {
                    return formatDate(new Date(record.createdAt));
                }
            },
        ];
        setColumns(dataColumns);
    }, [data, totalItemData, page, paginationSize, Light, Fan, filterSensor, filterStatus])

    const onChange = (pagination, filters, sorter, extra) => {
        if (filters?.status) {
            setFilterStatus(filters.status.join(","));
        } else {
            setFilterStatus("");
        }
        if (filters['1']) {
            setFilterSensor(filters['1'].join(","));
        } else {
            setFilterSensor("");
        }
        setSortDirections(sorter.order === 'ascend' ? "ASC" : "DESC");
    };

    return <div className=' p-[10px] bg-white'>
        <div className='flex gap-[10px] h-[40px] items-center'>
            <RangePicker onChange={(e, dateString) => {
                setSearchDate(dateString)
            }}  className='h-full'/>
            <Button type="primary" className='bg-[#1677ff] h-full' onClick={() => { fetchData().then(); }}>Search</Button>
        </div>
        <div className='mt-[10px]'>
            <Table columns={columns} dataSource={data}
                onChange={onChange}
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
                pagination={{
                    onChange(current, pageSize) {
                        setPage(current);
                        setPaginationSize(pageSize);
                    },
                    defaultPageSize: paginationSize,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20", "30"],
                    total: totalItemData,
                }}
            />
        </div>
    </div>
}

export default StatusLog;