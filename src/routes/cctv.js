import Cctv from "../pages/CCTV/CCTV";

const root = "/cctv";

const cctv = [
    {
        path: `${root}`,
        component: <Cctv/>,
        navbar: true,
        sidebar: true,
    },
];

export default cctv;
