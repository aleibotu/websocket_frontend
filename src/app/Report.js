'use client';
import React, {useEffect, useState} from 'react';
import {CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Tooltip} from 'chart.js'
import {Line} from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
import {Card, Collapse, DatePicker} from "antd";

const {RangePicker} = DatePicker;
Chart.register(StreamingPlugin, CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

export default function Report() {
    const [msg, setMsg] = useState({})

    useEffect(() => {
        const client = new WebSocket(`${process.env.NEXT_PUBLIC_MQTT_BROKER_HOST}`);
        client.onmessage = (event) => {
            setMsg(JSON.parse(event.data))
        }
    }, [])

    const items = [
        {
            key: '1',
            label: '空气监测站',
            children: <CustomChart topic="sensor/001" msg={msg}/>,
        },
        {
            key: '2',
            label: '水体监测站',
            children: <CustomChart topic="sensor/002" msg={msg}/>
        },
        {
            key: '3',
            label: '土壤监测站',
            children: <CustomChart topic="sensor/003" msg={msg}/>
        }
    ]

    return (
        <>
            <Collapse items={items}/>
        </>
    )
}

function CustomChart({msg, topic}) {
    return (
        <>
            <Card>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{width: '50%'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', paddingRight: '0.3rem'}}>
                            <div>历史数据</div>
                            <RangePicker showTime/>
                        </div>
                        <HistoryChart/>
                    </div>
                    <div style={{
                        width: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>实时数据</div>
                        <br/>
                        <div style={{display: 'flex', alignItems: 'flex-end'}}>
                            <RealTimeChart msg={msg} topicStr={topic}/>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}

function HistoryChart() {
    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
            {
                label: 'PM10(%)',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'PM2.5(%)',
                data: [69, 55, 89, 87, 50, 51, 49],
                backgroundColor: 'rgba(255, 127, 14, 0.2)',
                borderColor: 'rgba(255, 127, 14, 1)',
                borderWidth: 1,
            },
        ],
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }

    return (
        <>
            <Line data={data} options={options}/>
        </>
    )
}

export function RealTimeChart({msg, topicStr}) {
    const [dataSets, setDataSets] = useState([]);

    useEffect(() => {
        const {topic, payload} = msg;
        if (topic === topicStr) {
            setDataSets(prev => {
                if (prev.length) {
                    return payload.list.map((item, index) => ({
                        ...prev[index],
                        data: [
                            ...prev[index].data,
                            {
                                x: Date.now(),
                                y: parseFloat(item.value)
                            }
                        ]
                    }))
                } else {
                    return payload.list.map(item => {
                        const red = Math.floor(Math.random() * 256);
                        const green = Math.floor(Math.random() * 256);
                        const blue = Math.floor(Math.random() * 256);

                        return {
                            label: `${item.name} (${item.unit})`,
                            data: [
                                {
                                    x: Date.now(),
                                    y: parseFloat(item.value)
                                }
                            ],
                            backgroundColor: 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + 0.2 + ')',
                            borderColor: 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + 1 + ')',
                            borderWidth: 1,
                        }
                    })
                }
            })
        }

    }, [msg, topicStr])

    const options = {
        animation: false,
        plugins: {
            title: 'some'
        },
        scales: {
            x: {
                type: 'realtime',
                realtime: {
                    delay: 3000,
                    duration: 6 * 10 * 1000,
                }
            },
            y: {
                beginAtZero: true,
            }
        },
        responsive: true
    }

    return (
        <div style={{width: '100%'}}>
            <Line data={{datasets: dataSets}} options={options}/>
        </div>
    )
}
