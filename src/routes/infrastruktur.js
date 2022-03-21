import Cctv from "../pages/Infrastruktur/Cctv/Cctv";

const root = "/infrastruktur-tik";

const infrastruktur = [
    {
        path: `${root}/cctv`,
        component: <Cctv/>,
        navbar: true,
        sidebar: true,
    },
];

export default infrastruktur;
