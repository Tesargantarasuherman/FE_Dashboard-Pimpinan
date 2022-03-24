import DomainIndikator from "../pages/Spbe/DomainIndikator/DomainIndikator";
import IndeksSpbe from "../pages/Spbe/IndeksSpbe/IndeksSpbe";
import PeraturanPerundangan from "../pages/Spbe/PeraturanPerundangan/PeraturanPerundangan";

const root = "/spbe";

const data = [
    {
        path: `${root}/indeks-spbe`,
        component: <IndeksSpbe/>,
        navbar: true,
        sidebar: true,
    },
    {
        path: `${root}/peraturan-perundangan`,
        component: <PeraturanPerundangan/>,
        navbar: true,
        sidebar: true,
    },
    {
        path: `${root}/domain-indikator`,
        component: <DomainIndikator/>,
        navbar: true,
        sidebar: true,
    },
];

export default data;
