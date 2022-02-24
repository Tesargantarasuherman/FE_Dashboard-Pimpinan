import Home from "../pages/Home";

const root = "/";

const user = [
    {
        path: `${root}`,
        component: <Home/>,
        navbar: true,
        sidebar: true,
    },
];

export default user;
