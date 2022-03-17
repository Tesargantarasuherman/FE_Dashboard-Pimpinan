import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SidebarContext } from '../contexts/sidebar'
import Logo from '../img/bsc 1.png'
import LogoDescription from '../img/bsc 2.png'
import data_sidebar from '../localdata/sidebar';
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();
    const { sidebar, setSidebar } = useContext(SidebarContext)
    const [active, setActive] = useState('home')
    const [dataSidebar, setDataSidebar] = useState(data_sidebar)
    useEffect(() => {
        let uri_ = window.location.href;
        let _uri = [];
        _uri = uri_.split('/')
        let active_url = _uri.slice(-1).pop()
        setActive(active_url)
    }, [])
    const actionSetActive = (parentParams, params) => {
        setActive(params.link)
        navigate(`${parentParams ? `/${parentParams.link}` : ''}/${params.link}`);
    }

    return (
        <>
            {/* Sidebar */}
            <ul className={`navbar-nav bg-white shadow sidebar sidebar-light accordion ${sidebar ? '' : 'toggled'}`} id="accordionSidebar">
                {/* Sidebar - Brand */}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="sidebar-brand-icon">
                        <img src={Logo} alt="" height={55} width={65} srcset="" />
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        <img src={LogoDescription} alt="" height={55} width={120} srcset="" />
                    </div>
                </Link>
                {/* Divider */}
                <hr className="sidebar-divider my-0" />
                {/* Nav Item - Dashboard */}
                <div className="sidebar-heading">Menu</div>
                {
                    dataSidebar.map(sidebar => {
                        return (
                            sidebar.data ? (
                                <li className="nav-item">
                                    <a className="nav-link collapsed font-weight-bold" href="#" data-toggle="collapse" data-target={`#${sidebar.link}`} aria-expanded="true" aria-controls="collapseTwo">
                                        <i className={`fas fa-fw ${sidebar.icon}`} />
                                        <span>{sidebar.name}</span>
                                    </a>
                                    <div id={`${sidebar.link}`} className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                        <div className="bg-primary py-2 collapse-inner rounded">
                                            {
                                                sidebar.data.map(data => {
                                                    return (
                                                        <a className="collapse-item text-light" onClick={() => actionSetActive(sidebar, data)}>{data.name}</a>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </li>
                            )
                                :
                                <li className={`nav-item ${active == sidebar.link ? 'active' : ''}`}>
                                    <div className={`btn nav-link text-secondary font-weight-bold ${active == sidebar.link ? 'text-light' : ''}`} onClick={() => actionSetActive(null, sidebar)}>
                                        <i class={`fa ${sidebar.icon} font-weight-bold ${active == sidebar.link ? 'text-light' : ''}`} aria-hidden="true"></i>
                                        <span>{sidebar.name}</span>
                                    </div>
                                </li>
                        )
                    })
                }
                {/* Divider */}
                <hr className="sidebar-divider" />

                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={() => setSidebar(!sidebar)} />
                </div>
            </ul>
            {/* End of Sidebar */}
        </>
    )
}

export default Sidebar