import Home from "../pages/Home";

const root = "/home";

const user = [
    {
        path: `${root}`,
        component: <Home/>,
        navbar: true,
        sidebar: true,
    },
];

export default user;
