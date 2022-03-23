
const data_sidebar = [
    {
        name: 'Dashboard',
        link: 'home',
        icon: 'fa-home'

    },
    {
        name: 'Aplikasi',
        link: 'aplikasi',
        icon: 'fa-desktop'

    },
    {
        name: 'Data dan Statistik',
        link:'data',
        icon: 'fa-desktop',
        data: [
            {
                name: 'Covid 19',
                link: 'covid19',
                icon: 'fa-table'
            }, {
                name: 'Vaksin',
                link: 'vaksin',
                icon: 'fa-table'
            }
        ]
    },
    {
        name: 'SPBE',
        link:'spbe',
        icon: 'fa-cog',
        data: [
            {
                name: 'Peraturan Perundangan',
                link: 'peraturan-perundangan',
                icon: 'fa-table'
            }, {
                name: 'Indeks SPBE',
                link: 'indeks-spbe',
                icon: 'fa-table'
            }
        ]
    },
    {
        name: 'Persandian dan Keamanan Informasi',
        link:'persandian',
        icon: 'fa-cog',
        data: [
            {
                name: 'CSIRT',
                link: 'csirt',
                icon: 'fa-table'
            }, {
                name: 'Pentest',
                link: 'pentest',
                icon: 'fa-table'
            }, {
                name: 'Insiden Siber',
                link: 'insiden-siber',
                icon: 'fa-table'
            }, {
                name: 'SE/TTE',
                link: 'tte',
                icon: 'fa-table'
            }
        ]
    },
    {
        name: 'Insfrastruktur TIK',
        link:'infrastruktur-tik',
        icon: 'fa-cogs',
        data: [
            {
                name: 'Menara Telekomunikasi',
                link: 'menara-telekomunikasi',
                icon: 'fa-table'
            }, {
                name: 'Wifi',
                link: 'wifi',
                icon: 'fa-table'
            }, {
                name: 'Data CCTV',
                link: 'cctv',
                icon: 'fa-camera'
            }
        ]
    },
]
export default data_sidebar