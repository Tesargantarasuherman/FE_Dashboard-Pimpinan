import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { SidebarContext } from '../contexts/sidebar'
import Logo from '../img/bsc 1.png'
import LogoDescription from '../img/bsc 2.png'
import data_sidebar from '../localdata/sidebar';
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();
    const { sidebar, setSidebar } = useContext(SidebarContext)
    const [active, setActive] = useState(`Dashboard`)
    const [dataSidebar, setDataSidebar] = useState(data_sidebar)

    const actionSetActive = (params) => {
        setActive(params.name)
        navigate(`/${params.link}`);
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
                            <li className={`nav-item ${active == sidebar.name ? 'active' : ''}`}>
                                <div className={`btn nav-link text-secondary font-weight-bold ${active == sidebar.name ? 'text-light' : ''}`} onClick={() => actionSetActive(sidebar)}>
                                    <i class={`fa ${sidebar.icon} font-weight-bold ${active == sidebar.name ? 'text-light' : ''}`} aria-hidden="true"></i>
                                    <span>{sidebar.name}</span>
                                </div>
                            </li>
                        )
                    })
                }
                {/* Divider */}
                <hr className="sidebar-divider" />
                {/* Heading */}
                {/* Nav Item - Pages Collapse Menu */}
                {/* <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog" />
                        <span>Smart City</span>
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <a className="collapse-item" href="buttons.html">Buttons</a>
                            <a className="collapse-item" href="cards.html">Cards</a>
                        </div>
                    </div>
                </li> */}
                {/* Divider */}
                {/* Sidebar Toggler (Sidebar) */}
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={() => setSidebar(!sidebar)} />
                </div>
            </ul>
            {/* End of Sidebar */}
        </>
    )
}

export default Sidebar