'use client';
import mqtt from 'mqtt';
import React, {useEffect, useState} from 'react';
import {Chart, CategoryScale, LinearScale, PointElement, LineElement} from 'chart.js'
import {Line} from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
import {Card, Collapse, DatePicker} from "antd";

const {RangePicker} = DatePicker;
Chart.register(StreamingPlugin, CategoryScale, LinearScale, PointElement, LineElement);

export default function Report() {
    const items = [
        {
            key: '1',
            label: '空气监测站',
            children: <CustomChart/>,
        },
        {
            key: '2',
            label: '土壤监测站',
            children: null,
        },
        {
            key: '3',
            label: '水体监测站',
            children: null
        }
    ];

    const onChange = (key) => {
        console.log(key);
    };
    return (
        <>
            <Collapse items={items} defaultActiveKey={['1']} onChange={onChange}/>
        </>
    )
}

function CustomChart() {
    const onChange = (date, dateStr) => {
        console.log(date, dateStr)
    }
    return (
        <>
            <Card>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{width: '50%'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', paddingRight: '0.85rem'}}>
                            <div>历史数据</div>
                            <RangePicker showTime onChange={onChange}/>
                        </div>
                        <HistoryChart/>
                    </div>
                    <div style={{width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <div>实时数据</div>
                        <div style={{display: 'flex', alignItems: 'flex-end'}}>
                            <RealTimeChart/>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}


function HistoryChart() {
    // 查到数据， 把这组数据的label 更改，同时更改 data，就行。
    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [{
            label: '# of Votes',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }]
    }
    const options = {
        scales: {
            y: {},
            x: {},
        },
        responsive: true
    }
    return (
        <>
            <div style={{width: '100%'}}>
                <Line data={data} options={options}/>
            </div>
        </>
    )
}

function RealTimeChart({data}) {
    const [chartData, setChartData] = useState({
        datasets: [{
            label: '# of Votes',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }]
    });
    const topic = ''

    useEffect(() => {
        const clientId = "emqx_react_" + Math.random().toString(16).substring(2, 8);
        const username = process.env.NEXT_PUBLIC_MQTT_USER_NAME;
        const password = process.env.NEXT_PUBLIC_MQTT_PASS;

        const client = mqtt.connect(`wss://${process.env.NEXT_PUBLIC_MQTT_BROKER_HOST}/wss`, {
            clientId,
            username,
            password,
        });

        client.on("connect", (packet) => {
            client.subscribe(topic, (err) => {
                if (!err) {
                    console.log(err);
                }
            })
        })

        client.on("message", (topic, message) => {
            const msg = JSON.parse(message.toString());
            updateChartData(msg);
        })

        return () => {
            client.end(); // Clean up by disconnecting client on unmount
        };
    }, [])

    const updateChartData = (msg) => {
        const {list} = msg;
        const value = list && list[3] ? parseInt(list[3].value) : 0;

        setChartData(prevChartData => ({
            datasets: prevChartData.datasets.map(dataset => ({
                ...dataset,
                data: [...dataset.data, {x: Date.now(), y: value}]
            }))
        }));
    };

    const options = {
        animation: false,
        plugins: {
            title: 'some'
        },
        scales: {
            x: {
                type: 'realtime',
                realtime: {
                    delay: 800,
                    duration: 10 * 1000,
                }
            },
            y: {
                beginAtZero: true,
                min: 0,
                max: 100
            }
        },
        responsive: true
    }


    return (
        <div style={{width: '100%'}}>
            <Line data={chartData} options={options}/>
        </div>
    )
}
