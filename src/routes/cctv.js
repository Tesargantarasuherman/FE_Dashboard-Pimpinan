import Cctv from "../pages/Cctv/Cctv";

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
