'use client'
import {MyBar, MyGauge, MyPie, MyRadiaGraph, MyTinyArea} from "./components";

// 为什么我不用 grid 布局, 如果grid 布局不能有 width 和 height 的画， 这个canvas 还是填不满， 先不管了，能跑就行。
function LeftWrap({children}) {
    return (
        <div style={{
            width: 'calc(100vw / 5 - 1.525rem)',
            margin: '0.25rem',
            padding: '0.25rem',
            height: 'calc(100vh / 5 - 1.5rem)',
            background: 'rgba(25, 26, 26, 0.2)',
            zIndex: 11,
            borderRadius: '0.25rem'
        }}>
            {children}
        </div>
    )
}

function RightWrap({children}) {
    return (
        <div style={{
            width: 'calc(100vw / 5 - 1rem)',
            margin: '0.25rem',
            padding: '0.25rem',
            height: 'calc(100vh / 5 - 1.5rem)',
            background: 'rgba(25, 26, 26, 0.2)',
            zIndex: 12,
            borderRadius: '0.25rem'
        }}>
            {children}
        </div>
    )
}
export default function MyChart() {
    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <div style={{padding: '0 0.25rem', height: '100vh', display: 'flex', flexDirection: 'column'}}>
                <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "space-between",
                    background: 'rgba(25, 26, 26, 0.2)',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 24,
                        fontWeight: 'bold',
                        letterSpacing: 7,
                        paddingLeft: 5,
                        height: '3rem'
                    }}>
                        {/*<h2 style={{color: '#ccc'}}>5G环境监测系统</h2>*/}
                    </div>
                    <div>
                        {/*<Alert*/}
                        {/*    message="Warning Text"*/}
                        {/*    type="error"*/}
                        {/*    closable*/}
                        {/*    onClose={() => console.log('close')}*/}
                        {/*    style={{width: 700}}*/}
                        {/*/>*/}
                    </div>
                </div>
                <div style={{display: 'flex', flex: 1}}>
                    <div style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <LeftWrap><MyPie/></LeftWrap>
                        <LeftWrap><MyBar/></LeftWrap>
                        <LeftWrap><MyRadiaGraph/></LeftWrap>
                        <LeftWrap>
                            <MyTinyArea/>
                        </LeftWrap>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column-reverse', flex: 1}}>
                        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                            <RightWrap><MyGauge /></RightWrap>
                            <RightWrap><MyGauge /></RightWrap>
                            <RightWrap><MyGauge /></RightWrap>
                            <RightWrap><MyGauge /></RightWrap>
                        </div>
                        {/*<div style={{alignSelf: 'flex-end', display: 'flex', justifyContent: 'space-evenly', width: '50%'}}>*/}
                        {/*    <div style={{*/}
                        {/*        width: 'calc(100vw / 2 - 1rem)',*/}
                        {/*        margin: '0.25rem',*/}
                        {/*        padding: '0.25rem',*/}
                        {/*        height: 'calc(100vh / 4 - 1.75rem)',*/}
                        {/*        background: 'rgba(25, 26, 26, 0.2)',*/}
                        {/*        zIndex: 11,*/}
                        {/*        borderRadius: '0.25rem'*/}
                        {/*    }}>*/}
                        {/*        <MyDual />*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div style={{alignSelf: 'flex-end'}}>*/}
                        {/*    <RightWrap><MyLiquid /></RightWrap>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}
