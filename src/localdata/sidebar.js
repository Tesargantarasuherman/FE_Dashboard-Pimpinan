
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
        icon: 'fa-desktop',
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
        name: 'Data CCTV',
        link: 'cctv',
        icon: 'fa-camera'
    }
]
export default data_sidebar