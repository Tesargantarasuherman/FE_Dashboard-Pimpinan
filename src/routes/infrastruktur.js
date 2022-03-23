import Cctv from "../pages/Infrastruktur/Cctv/Cctv";
import Tower from "../pages/Infrastruktur/Tower/Tower";
import Wifi from "../pages/Infrastruktur/Wifi/Wifi";

const root = "/infrastruktur-tik";

const infrastruktur = [
    {
        path: `${root}/cctv`,
        component: <Cctv/>,
        navbar: true,
        sidebar: true,
    },
    {
        path: `${root}/menara-telekomunikasi`,
        component: <Tower/>,
        navbar: true,
        sidebar: true,
    },
    {
        path: `${root}/wifi`,
        component: <Wifi/>,
        navbar: true,
        sidebar: true,
    },
];

export default infrastruktur;
