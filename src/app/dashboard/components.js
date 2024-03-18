'use client'
import {useEffect, useRef} from "react";
import {Bar, DualAxes, Gauge, Liquid, Pie, Radar, RadialGraph, TinyArea} from "@ant-design/charts";

export const MyPie = () => {
    const data = [
        {
            type: '分类一',
            value: 27,
        },
        {
            type: '分类二',
            value: 25,
        },
        {
            type: '分类三',
            value: 18,
        },
        {
            type: '分类四',
            value: 15,
        },
        {
            type: '分类五',
            value: 10,
        },
        {
            type: '其他',
            value: 5,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.7,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    fontSize: 18,
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: '1000\n个',
            },
        },
    };
    return (
        <Pie autoFit {...config} />
    );
};

export const MyBar = () => {
    const data = [
        {
            label: 'Mon.',
            type: 'series1',
            value: 2800,
        },
        {
            label: 'Mon.',
            type: 'series2',
            value: 2260,
        },
        {
            label: 'Tues.',
            type: 'series1',
            value: 1800,
        },
        {
            label: 'Tues.',
            type: 'series2',
            value: 1300,
        },
        {
            label: 'Wed.',
            type: 'series1',
            value: 950,
        },
        {
            label: 'Wed.',
            type: 'series2',
            value: 900,
        },
        {
            label: 'Thur.',
            type: 'series1',
            value: 500,
        },
        {
            label: 'Thur.',
            type: 'series2',
            value: 390,
        },
        {
            label: 'Fri.',
            type: 'series1',
            value: 170,
        },
        {
            label: 'Fri.',
            type: 'series2',
            value: 100,
        },
    ];
    const config = {
        data,
        isGroup: true,
        xField: 'value',
        yField: 'label',
        seriesField: 'type',
        dodgePadding: 4,
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'left', 'middle', 'right'
            // 可配置附加的布局方法
            layout: [
                // 柱形图数据标签位置自动调整
                {
                    type: 'interval-adjust-position',
                }, // 数据标签防遮挡
                {
                    type: 'interval-hide-overlap',
                }, // 数据标签文颜色自动调整
                {
                    type: 'adjust-color',
                },
            ],
        },
    };
    return <Bar {...config} />;
}

export const MyRadiaGraph = () => {
    const chartRef = useRef();
    const RadialData = {
        nodes: [
            {
                id: '0',
                label: '0',
            },
            {
                id: '1',
                label: '1',
            },
            {
                id: '2',
                label: '2',
            },
            {
                id: '3',
                label: '3',
            },
            {
                id: '4',
                label: '4',
            },
            {
                id: '5',
                label: '5',
            },
            {
                id: '6',
                label: '6',
            },
            {
                id: '7',
                label: '7',
            },
            {
                id: '8',
                label: '8',
            },
            {
                id: '9',
                label: '9',
            },
        ],
        edges: [
            {
                source: '0',
                target: '1',
            },
            {
                source: '0',
                target: '2',
            },
            {
                source: '0',
                target: '3',
            },
            {
                source: '0',
                target: '4',
            },
            {
                source: '0',
                target: '5',
            },
            {
                source: '0',
                target: '6',
            },
            {
                source: '0',
                target: '7',
            },
            {
                source: '0',
                target: '8',
            },
            {
                source: '0',
                target: '9',
            },
        ],
    };

    const fetchData = (node) => {
        return new Promise((resolve, reject) => {
            const data = new Array(Math.ceil(Math.random() * 10) + 2).fill('').map((_, i) => i + 1);
            setTimeout(() => {
                resolve({
                    nodes: [
                        {
                            ...node,
                        },
                    ].concat(
                        data.map((i) => {
                            return {
                                id: `${node.id}-${i}`,
                                label: `${node.label}-${i}`,
                            };
                        }),
                    ),
                    edges: data.map((i) => {
                        return {
                            source: node.id,
                            target: `${node.id}-${i}`,
                        };
                    }),
                });
            }, 1000);
        });
    };

    const asyncData = async (node) => {
        return await fetchData(node);
    };

    const config = {
        data: RadialData,
        autoFit: false,
        layout: {
            unitRadius: 80,
            /** 节点直径 */
            nodeSize: 20,
            /** 节点间距 */
            nodeSpacing: 10,
        },
        nodeCfg: {
            asyncData,
            size: 20,
            style: {
                fill: '#6CE8DC',
                stroke: '#6CE8DC',
            },
            labelCfg: {
                style: {
                    fontSize: 5,
                    fill: '#000',
                },
            },
        },
        menuCfg: {
            customContent: (e) => {
                return (
                    <div>
                        <button
                            onClick={() => {
                                chartRef.current.emit('node:dblclick', e);
                            }}
                        >
                            手动拓展(双击节点也可以拓展)
                        </button>
                    </div>
                );
            },
        },
        edgeCfg: {
            style: {
                lineWidth: 1,
            },
            endArrow: {
                d: 10,
                size: 2,
            },
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        onReady: (graph) => {
            chartRef.current = graph;
        },
    };

    return <RadialGraph style={{background: null}} {...config} />;
}

export const MyTinyArea = () => {
    const data = [
        264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
    ];
    const config = {
        height: 60,
        autoFit: false,
        data,
        smooth: true,
        color: '#E5EDFE',
        pattern: {
            type: 'line',
            cfg: {
                stroke: '#5B8FF9',
            },
        },
    };
    return <TinyArea {...config} />;
}

export const MyGauge = () => {
    const config = {
        width: 720,
        height: 720,
        autoFit: true,
        data: {
            target: 120,
            total: 400,
            name: 'score',
        },
        legend: false,
    };
    return <Gauge {...config} />;
}

export const MyDual = () => {
    const data = [
        {
            year: '1991',
            value: 3,
            count: 10,
        },
        {
            year: '1992',
            value: 4,
            count: 4,
        },
        {
            year: '1993',
            value: 3.5,
            count: 5,
        },
        {
            year: '1994',
            value: 5,
            count: 5,
        },
        {
            year: '1995',
            value: 4.9,
            count: 4.9,
        },
        {
            year: '1996',
            value: 6,
            count: 35,
        },
        {
            year: '1997',
            value: 7,
            count: 7,
        },
        {
            year: '1998',
            value: 9,
            count: 1,
        },
        {
            year: '1999',
            value: 13,
            count: 20,
        },
    ];
    const config = {
        data: [data, data],
        xField: 'year',
        yField: ['value', 'count'],
        geometryOptions: [
            {
                geometry: 'line',
                smooth: false,
                color: '#5B8FF9',
                label: {
                    formatter: (datum) => {
                        return `${datum.value}个`;
                    },
                },
                lineStyle: {
                    lineWidth: 3,
                    lineDash: [5, 5],
                },
            },
            {
                geometry: 'line',
                smooth: true,
                color: '#5AD8A6',
                lineStyle: {
                    lineWidth: 4,
                    opacity: 0.5,
                },
                label: {
                    formatter: (datum) => {
                        return `${datum.count}个`;
                    },
                },
                point: {
                    shape: 'circle',
                    size: 4,
                    style: {
                        opacity: 0.5,
                        stroke: '#5AD8A6',
                        fill: '#fff',
                    },
                },
            },
        ],
    };
    return <DualAxes {...config} />;
}

export const MyLiquid = () => {
    const config = {
        percent: 0.25,
        outline: {
            border: 4,
            distance: 8,
        },
        wave: {
            length: 128,
        },
    };
    return <Liquid {...config} />;
}
const data = [
    { item: 'Design', type: 'a', score: 70 },
    { item: 'Design', type: 'b', score: 30 },
    { item: 'Development', type: 'a', score: 60 },
    { item: 'Development', type: 'b', score: 70 },
    { item: 'Marketing', type: 'a', score: 50 },
    { item: 'Marketing', type: 'b', score: 60 },
    { item: 'Users', type: 'a', score: 40 },
    { item: 'Users', type: 'b', score: 50 },
    { item: 'Test', type: 'a', score: 60 },
    { item: 'Test', type: 'b', score: 70 },
    { item: 'Language', type: 'a', score: 70 },
    { item: 'Language', type: 'b', score: 50 },
    { item: 'Technology', type: 'a', score: 50 },
    { item: 'Technology', type: 'b', score: 40 },
    { item: 'Support', type: 'a', score: 30 },
    { item: 'Support', type: 'b', score: 40 },
    { item: 'Sales', type: 'a', score: 60 },
    { item: 'Sales', type: 'b', score: 40 },
    { item: 'UX', type: 'a', score: 50 },
    { item: 'UX', type: 'b', score: 60 },
];
export const MyRadar = () => {
    const config = {
        data,
        xField: 'item',
        yField: 'score',
        colorField: 'type',
        shapeField: 'smooth',
        area: {
            style: {
                fillOpacity: 0.5,
            },
        },
        scale: { x: { padding: 0.5, align: 0 }, y: { tickCount: 5, domainMax: 80 } },
        axis: { x: { grid: true }, y: { zIndex: 1, title: false } },
        style: {
            lineWidth: 2,
        },
    };
    return <Radar {...config} />;
}
