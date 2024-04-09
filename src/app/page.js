import Report from "@/app/Report";

export default async function Home() {
    return (
        <>
            {/*<div style={{height: 50, width: 'calc(100% - 20px)', paddingLeft: 10, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 80}}>*/}
            {/*    <Link href="/dashboard" target="_blank"><Button>大屏</Button></Link>*/}
            {/*    <Link href="/camera" target="_blank"><Button>摄像头</Button></Link>*/}
            {/*</div>*/}
            <Report />
        </>
    )
};
