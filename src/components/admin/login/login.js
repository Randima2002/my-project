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

const login = () => {
    const [expand, setExpand] = useState(true);
    const [activeKey, setActiveKey] = useState("1");

    const renderContent = () => {
        switch (activeKey) {
            case "1":
                return <div>Dashboard Content</div>;
            case "2":
                return <div>User Group Content</div>;
            case "3-1":
                return <div>Geo Content</div>;
            case "3-2":
                return <div>Devices Content</div>;
            case "3-3":
                return <div>Brand Content</div>;
            case "3-4":
                return <div>Loyalty Content</div>;
            case "3-5":
                return <div>Visit Depth Content</div>;
            case "4-1":
                return <div>Applications Content</div>;
            case "4-2":
                return <div>Websites Content</div>;
            case "4-3":
                return <div>Channels Content</div>;
            case "4-4":
                return <div>Tags Content</div>;
            case "4-5":
                return <div>Versions Content</div>;
            default:
                return <div>Select a tab to view content</div>;
        }
    };

    return (
        <div className="show-fake-browser login-page">
            <div className="show-fake-browser sidebar-page">
                <Container>
                    <Sidebar
                        style={{ display: 'flex', flexDirection: 'column' }}
                        width={expand ? 260 : 56}
                        collapsible
                    >
                        <Sidenav.Header>
                            <div style={headerStyles}>
                                <span style={{ marginLeft: 12 }}>BRAND</span>
                            </div>
                        </Sidenav.Header>
                        <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
                            <Sidenav.Body>
                                <Nav onSelect={setActiveKey}>
                                    <Nav.Item eventKey="1" active={activeKey === "1"} icon={<DashboardIcon />}>
                                        Dashboard
                                    </Nav.Item>
                                    <Nav.Item eventKey="2" active={activeKey === "2"} icon={<GroupIcon />}>
                                        User Group
                                    </Nav.Item>
                                    <Nav.Menu
                                        eventKey="3"
                                        trigger="hover"
                                        title="Advanced"
                                        icon={<MagicIcon />}
                                        placement="rightStart"
                                    >
                                        <Nav.Item eventKey="3-1" active={activeKey === "3-1"}>Geo</Nav.Item>
                                        <Nav.Item eventKey="3-2" active={activeKey === "3-2"}>Devices</Nav.Item>
                                        <Nav.Item eventKey="3-3" active={activeKey === "3-3"}>Brand</Nav.Item>
                                        <Nav.Item eventKey="3-4" active={activeKey === "3-4"}>Loyalty</Nav.Item>
                                        <Nav.Item eventKey="3-5" active={activeKey === "3-5"}>Visit Depth</Nav.Item>
                                    </Nav.Menu>
                                    <Nav.Menu
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
                                    </Nav.Menu>
                                </Nav>
                            </Sidenav.Body>
                        </Sidenav>
                        <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
                    </Sidebar>

                    <Container>
                        <Header>
                            <h2>Page Title</h2>
                        </Header>
                        <Content>
                            {renderContent()}
                        </Content>
                    </Container>
                </Container>
            </div>
        </div>
    );
};

export default login;
