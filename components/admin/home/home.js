'use client'
import { Container, Header, Sidebar, Sidenav, Content, Navbar, Nav } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import { useEffect, useState } from 'react';
import Homecal from './dashboard/dashcal';
import User from './user/user';
import Room from './room/room';
import Review from './review/review';
import ImageGallery from './imagegallery/imagegallery';
import { useSession } from 'next-auth/react';
import HeaderAdmin from './../header/header';


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

const home = ({ session }) => {
    // const session = await getServerSession();
    console.log("user session is Home: ", session.user);
    const [Logeduser, setLogeduser] = useState(null);
    const [Logedusername, setLogedusername] = useState(null);
    // Log the user role

    const fetchDataLogedUser = async () => {
        const data = {email:session.user.email};
        console.log("data is home: ", JSON.stringify(data))
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const Data = await response.json();
                console.error('API response error:', Data);
                throw new Error('Error tetching user');
            }

            const responseData = await response.json();
            setLogeduser(responseData.isadmin);
            setLogedusername(responseData.name)
            console.log("Home Data is: ", responseData.isadmin);
        } catch (error) {
            console.log(error);
        } finally {
        }
    };


    useEffect(() => {
        if (session) {
            console.log("User role:", session.user.email); // Log the user role
            // if (session.user.role === 'admin') {
            //     router.push('/admin');
            // }
            fetchDataLogedUser();
        }

    }, [session]);
    const [expand, setExpand] = useState(true);
    const [activeKey, setActiveKey] = useState("1");
    console.log("Logeduser :" + Logeduser);
    // console.log(session);
    const renderContent = () => {
        if (Logeduser === "admin") {
            switch (activeKey) {
                case "1":
                    return <div><Homecal /></div>;
                case "2":
                    return <div><User /></div>;
                default:
                    return <div><Homecal /></div>;
            }
        } else {
            switch (activeKey) {
                case "1":
                    return <div><Homecal /></div>;
                default:
                    return <div><Homecal /></div>;
            }
        }
    };

    return (
        <div className="show-fake-browser sidebar-page ">
            <HeaderAdmin  Logedusername={Logedusername}/>
            <Container className=' flex flex-row'>
                <Sidebar
                    style={{ display: 'flex', flexDirection: 'column' }}
                    width={expand ? 260 : 56}
                    collapsible
                    className=' h-[80vh] bg-slate-100'>
                    <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
                        <Sidenav.Body>
                            <Nav onSelect={setActiveKey}>
                                <Nav.Item eventKey="1" active={activeKey === "1"} icon={<DashboardIcon Logedusername={Logedusername}/>}>
                                    Dashboard
                                </Nav.Item>
                                {Logeduser === "admin" && (
                                    <Nav.Item eventKey="2" active={activeKey === "2"} icon={<GroupIcon />}>
                                        User Settings
                                    </Nav.Item>
                                )}
                                {/* <Nav.Menu
                                        eventKey="3"
                                        trigger="hover"
                                        title="Page Setting"
                                        icon={<MagicIcon />}
                                        placement="rightStart"
                                    > */}
                                {/* <Nav.Item eventKey="3-1" active={activeKey === "3-1"}>Rooms Setting</Nav.Item>
                                        <Nav.Item eventKey="3-2" active={activeKey === "3-2"}>Reviews</Nav.Item>
                                        <Nav.Item eventKey="3-3" active={activeKey === "3-3"}>Image Gallery</Nav.Item> */}
                                {/* <Nav.Item eventKey="3-4" active={activeKey === "3-4"}>Loyalty</Nav.Item>
                                        <Nav.Item eventKey="3-5" active={activeKey === "3-5"}>Visit Depth</Nav.Item> */}
                                {/* </Nav.Menu> */}
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

                <Container className=' h-auto overflow-scroll'>
                    {/* <Header>
                            <h2>Page Title</h2>
                        </Header> */}
                    <Content className=' h-auto'>
                        {renderContent()}
                    </Content>
                </Container>
            </Container>
        </div>
    );
};

export default home;
