'use client'
import {Alert} from "antd";
import {MyBar, MyDual, MyGauge, MyLiquid, MyPie, MyRadiaGraph, MyTinyArea} from "./components";

function Wrap({children, styles}) {
    // 地图一出现，背景就没了。
    return (
        <div style={{
            position: "relative",
            width: 350,
            height: 160,
            padding: 5,
            background: 'rgba(80, 196, 237, 0.2)',
            zIndex: 11,
            marginTop: 10,
            borderRadius: 10,
            ...styles
        }}>
            {children}
        </div>
    )
}

export default function MyChart() {
    return (
        <div style={{display: "flex", flexDirection: 'column', margin: '0 10px', height: '100%'}}>
            <div style={{height: 68, display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
                <Wrap styles={{height: 40}}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        fontSize: 24,
                        fontWeight: 'bold',
                        letterSpacing: 7,
                        paddingLeft: 5
                    }}>
                        5G环境监测系统
                    </div>
                </Wrap>
                <div>
                    <Alert
                        message="Warning Text"
                        type="warning"
                        closable
                        onClose={() => console.log('close')}
                        style={{width: 700}}
                    />
                </div>
            </div>
            <div style={{display: 'flex', flex: 1}}>
                <div style={{width: 350}}>
                    <Wrap><MyPie/></Wrap>
                    <Wrap><MyBar/></Wrap>
                    <Wrap><MyRadiaGraph/></Wrap>
                    <Wrap><MyTinyArea/></Wrap>
                    <Wrap><MyTinyArea/></Wrap>
                </div>
                <div style={{display: 'flex', flexDirection: 'column-reverse', flex: 1}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', paddingLeft: 24}}>
                        <Wrap><MyGauge/></Wrap>
                        <Wrap><MyGauge/></Wrap>
                        <Wrap><MyGauge/></Wrap>
                        <Wrap><MyGauge/></Wrap>
                    </div>
                    <div style={{alignSelf: 'flex-end'}}>
                        <Wrap styles={{width: 700}}><MyDual/></Wrap>
                    </div>
                    <div style={{alignSelf: 'flex-end'}}>
                        <Wrap><MyLiquid/></Wrap>
                    </div>
                </div>
            </div>
        </div>
    )
}
