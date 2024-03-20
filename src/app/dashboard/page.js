'use client'
import React, {useEffect, useState} from "react";
import Image from "next/image";

import {Autoplay, Virtual} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

import MyMap from "@/app/dashboard/MyMap";
import {RealTimeChart} from "@/app/Report";

import 'swiper/css';
import {Gauge} from "@ant-design/charts";

const MyGauge = () => {
    const config = {
        width: 420,
        height: 420,
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
export default function Page() {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <div style={{height: '100vh', display: 'flex', flexDirection: 'column', background: 'black'}}>
                <div style={{
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 5px'
                }}>
                    {/*  header  */}
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Image src="/logo.png" alt="logo" width={50} height={50}/>
                        <span style={{color: 'white', fontSize: 24, fontWeight: "bold"}}>5G 环境监测系统</span>
                    </div>
                    <div style={{color: 'white', height: 25, position: 'relative', display: 'flex', gap: 30}}>
                        <Swiper
                            direction="vertical"
                            loop={true}
                            autoplay={{delay: 1000 * 3}}
                            speed={1000}
                            modules={[Autoplay]}
                            style={{height: '100%'}}
                        >
                            <SwiperSlide>周一 12°~29°</SwiperSlide>
                            <SwiperSlide>周二 14°~22°</SwiperSlide>
                            <SwiperSlide>周三 16°~27°</SwiperSlide>
                            <SwiperSlide>周四 19°~25°</SwiperSlide>
                            <SwiperSlide>周五 14°~28°</SwiperSlide>
                            <SwiperSlide>周六 17°~23°</SwiperSlide>
                            <SwiperSlide>周日 18°~25°</SwiperSlide>
                        </Swiper>
                        <span style={{width: 160}}>{currentDate.toLocaleString()}</span>
                    </div>
                </div>
                <div style={{flex: 1}}>
                    <div style={{display: "flex"}}>
                        <div style={{width: 300, height: 'calc(100vh - 58px)', color: 'white'}}>
                            {/*  chart  */}
                            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: 12}}>
                                <div style={{height: 'calc((100vh - 58px) / 4)'}}>
                                    <br/>
                                    <span>空气质量监测站</span>
                                    <div>
                                        {/*  chart 1  */}
                                        <RealTimeChart msg={{}} topicStr="sensor/001/001"/>
                                    </div>
                                    <hr style={{color: '#e8e8e8'}}/>
                                </div>
                                <div style={{height: 'calc((100vh - 58px) / 4)'}}>
                                    <span>土壤质量监测站</span>
                                    <div>
                                        {/*  chart 2  */}
                                        <RealTimeChart msg={{}} topicStr="sensor/001/001"/>
                                    </div>
                                    <hr style={{color: '#e8e8e8'}}/>
                                </div>
                                <div style={{height: 'calc((100vh - 58px) / 4)'}}>
                                    <span>水体质量监测站</span>
                                    <div>
                                        {/*  chart 3  */}
                                        <RealTimeChart msg={{}} topicStr="sensor/001/001"/>
                                    </div>
                                    <hr style={{color: '#e8e8e8'}}/>
                                </div>
                                <div style={{height: 'calc((100vh - 58px) / 4)'}}>
                                    <span>报警信息</span>
                                    <div style={{width: '100%'}}>
                                        <div style={{
                                            color: 'white',
                                            height: 'calc((100vh - 58px) / 4 - 30px)',
                                            position: 'relative',
                                            display: 'flex',
                                            gap: 30,
                                            overflow: "hidden"
                                        }}>
                                            <Swiper
                                                direction="vertical"
                                                loop={true}
                                                autoplay={{delay: 1000 * 2}}
                                                speed={1000}
                                                modules={[Autoplay, Virtual]}
                                                style={{height: '100%'}}
                                                watchSlidesProgress={true}
                                                slidesPerView={5}
                                            >
                                                <SwiperSlide><> device 00000001 信息sldfj</></SwiperSlide>
                                                <SwiperSlide><> device 00000002 信息sldfjd</></SwiperSlide>
                                                <SwiperSlide><> device 00000003 信息sdlfjsldkf</></SwiperSlide>
                                                <SwiperSlide><> device 00000004 信息sdlfjfklsdfkhsfd</></SwiperSlide>
                                                <SwiperSlide><> device 00000005 信息sldkfjk</></SwiperSlide>
                                                <SwiperSlide><> device 00000006 信息sldkfjsdkjf</></SwiperSlide>
                                                <SwiperSlide><> device 00000007 信息sldkfskldf</></SwiperSlide>
                                                <SwiperSlide><> device 00000008 信息sldfjksdfj</></SwiperSlide>
                                            </Swiper>
                                        </div>
                                    </div>
                                    <hr style={{color: '#e8e8e8'}}/>
                                </div>
                            </div>
                        </div>

                        <div style={{flex: 1, position: 'relative'}}>
                            <MyMap/>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 200,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: 'center',
                gap: 20
            }}>
                <div style={{width: 100, height: 100}}>
                    <MyGauge/>
                </div>
                <div style={{width: 100, height: 100}}>
                    <MyGauge/>
                </div>
                <div style={{width: 100, height: 100}}>
                    <MyGauge/>
                </div>
            </div>
        </>
    )
}
