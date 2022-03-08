import Aplikasi from "../pages/Aplikasi";

const root = "/aplikasi";

const user = [
    {
        path: `${root}`,
        component: <Aplikasi/>,
        navbar: true,
        sidebar: true,
    },
];

export default user;
