'use client'
import { Container, Header, Sidebar, Sidenav, Content, Navbar, Nav } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import { useState } from 'react';
import Homecal from './dashboardcalender/dashcal';
import User from './user/user';


const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: '#34c3ff',
    color: '#fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
};

const NavToggle = ({ expand, onChange }) => {
    return (
        <Navbar appearance="subtle" className="nav-toggle">
            

            <Nav pullRight>
                <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
                    {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
                </Nav.Item>
            </Nav>
        </Navbar>
    );
};

const home = () => {
    const [expand, setExpand] = useState(true);
    const [activeKey, setActiveKey] = useState("1");

    const renderContent = () => {
        switch (activeKey) {
            case "1":
                return <div><Homecal/></div>;
            case "2":
                return <div></div>;
            case "3-1":
                return <div>Room Setting</div>;
            case "3-2":
                return <div>Review</div>;
            case "3-3":
                return <div>Image Gallery</div>;
            // case "3-4":
            //     return <div>Loyalty Content</div>;
            // case "3-5":
            //     return <div>Visit Depth Content</div>;
            // case "4-1":
            //     return <div>Applications Content</div>;
            // case "4-2":
            //     return <div>Websites Content</div>;
            // case "4-3":
            //     return <div>Channels Content</div>;
            // case "4-4":
            //     return <div>Tags Content</div>;
            // case "4-5":
            //     return <div>Versions Content</div>;
            default:
                return <div>Room Setting</div>;
        }
    };

    return (
            <div className="show-fake-browser sidebar-page ">
                <Container className=' flex flex-row'>
                    <Sidebar
                        style={{ display: 'flex', flexDirection: 'column'}}
                        width={expand ? 260 : 56}
                        collapsible
                        className=' h-screen bg-slate-100'>
                        <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
                            <Sidenav.Body>
                                <Nav onSelect={setActiveKey}>
                                    <Nav.Item eventKey="1" active={activeKey === "1"} icon={<DashboardIcon />}>
                                        Dashboard
                                    </Nav.Item>
                                    <Nav.Item eventKey="2" active={activeKey === "2"} icon={<GroupIcon />}>
                                        User Settings
                                    </Nav.Item>
                                    <Nav.Menu
                                        eventKey="3"
                                        trigger="hover"
                                        title="Page Setting"
                                        icon={<MagicIcon />}
                                        placement="rightStart"
                                    >
                                        <Nav.Item eventKey="3-1" active={activeKey === "3-1"}>Rooms Setting</Nav.Item>
                                        <Nav.Item eventKey="3-2" active={activeKey === "3-2"}>Reviews</Nav.Item>
                                        <Nav.Item eventKey="3-3" active={activeKey === "3-3"}>Image Gallery</Nav.Item>
                                        {/* <Nav.Item eventKey="3-4" active={activeKey === "3-4"}>Loyalty</Nav.Item>
                                        <Nav.Item eventKey="3-5" active={activeKey === "3-5"}>Visit Depth</Nav.Item> */}
                                    </Nav.Menu>
                                    {/* <Nav.Menu
                                        eventKey="4"
                                        trigger="hover"
                                        title="Settings"
                                        icon={<GearCircleIcon />}
                                        placement="rightStart"
                                    >
                                        <Nav.Item eventKey="4-1" active={activeKey === "4-1"}>Applications</Nav.Item>
                                        <Nav.Item eventKey="4-2" active={activeKey === "4-2"}>Websites</Nav.Item>
                                        <Nav.Item eventKey="4-3" active={activeKey === "4-3"}>Channels</Nav.Item>
                                        <Nav.Item eventKey="4-4" active={activeKey === "4-4"}>Tags</Nav.Item>
                                        <Nav.Item eventKey="4-5" active={activeKey === "4-5"}>Versions</Nav.Item>
                                    </Nav.Menu> */}
                                </Nav>
                            </Sidenav.Body>
                        </Sidenav>
                        <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
                    </Sidebar>

                    <Container>
                        {/* <Header>
                            <h2>Page Title</h2>
                        </Header> */}
                        <Content>
                            {renderContent()}
                        </Content>
                    </Container>
                </Container>
            </div>
    );
};

export default home;
