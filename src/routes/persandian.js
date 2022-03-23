import Csirt from "../pages/Persandian/Csirt/Csirt";
import InsidenSiber from "../pages/Persandian/InsidenSiber/InsidenSiber";
import Pentest from "../pages/Persandian/Pentest/Pentest";
import Tte from "../pages/Persandian/Tte/Tte";

const root = "/persandian";

const persandian = [
    {
        path: `${root}/csirt`,
        component: <Csirt/>,
        navbar: true,
        sidebar: true,
    },
    {
        path: `${root}/pentest`,
        component: <Pentest/>,
        navbar: true,
        sidebar: true,
    },
    {
        path: `${root}/insiden-siber`,
        component: <InsidenSiber/>,
        navbar: true,
        sidebar: true,
    },
    {
        path: `${root}/tte`,
        component: <Tte/>,
        navbar: true,
        sidebar: true,
    },

];

export default persandian;
