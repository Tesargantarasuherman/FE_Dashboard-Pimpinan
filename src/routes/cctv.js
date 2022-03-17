import CCTV from "../pages/Cctv/Cctv";

const root = "/cctv";

const cctv = [
    {
        path: `${root}`,
        component: <CCTV/>,
        navbar: true,
        sidebar: true,
    },
];

export default cctv;
