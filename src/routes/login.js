import Login from "../pages/Login";

const root = "/";

const login = [
    {
        path: `${root}`,
        component: <Login/>,
        navbar: false,
        sidebar: false,
    },
];

export default login;
