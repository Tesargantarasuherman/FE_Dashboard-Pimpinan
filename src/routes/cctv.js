import CCTV from "../pages/CCTV/CCTV";

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
