import Data from "../pages/Data/Covid/Covid";
import Vaksin from "../pages/Data/Vaksin/Vaksin";

const root = "/data";

const data = [
    {
        path: `${root}/covid19`,
        component: <Data/>,
        navbar: true,
        sidebar: true,
    },
    {
        path: `${root}/vaksin`,
        component: <Vaksin/>,
        navbar: true,
        sidebar: true,
    },
];

export default data;
