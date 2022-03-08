import React, { useContext, useState } from 'react'
import { SidebarContext } from '../contexts/sidebar'
import Logo from '../img/bsc 1.png'
import LogoDescription from '../img/bsc 2.png'
function Sidebar() {
    const { sidebar, setSidebar } = useContext(SidebarContext)
    const [active, setActive] = useState(false)

    return (
        <>
            {/* Sidebar */}
            <ul className={`navbar-nav bg-white shadow sidebar sidebar-light accordion ${sidebar ? '' : 'toggled'}`} id="accordionSidebar">
                {/* Sidebar - Brand */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon">
                        <img src={Logo} alt="" height={55} width={65} srcset="" />
                    </div>
                    <div className="sidebar-brand-text mx-3">
                    <img src={LogoDescription} alt="" height={55} width={120} srcset="" />
                    </div>
                </a>
                {/* Divider */}
                <hr className="sidebar-divider my-0" />
                {/* Nav Item - Dashboard */}
                <li className="nav-item active">
                    <a className="nav-link" href="index.html">
                        <i class="fa fa-home" aria-hidden="true"></i>
                        <span>Beranda</span></a>
                </li>
                {/* Divider */}
                <hr className="sidebar-divider" />
                {/* Heading */}
                <div className="sidebar-heading">Interface</div>
                {/* Nav Item - Pages Collapse Menu */}
                <li className="nav-item">
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
                </li>
                {/* Divider */}
                <hr className="sidebar-divider d-none d-md-block" />
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