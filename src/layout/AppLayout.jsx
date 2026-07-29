import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import RightSidebar from './RightSidebar.jsx';
import Footer from './Footer.jsx';

export default function AppLayout() { return <><Header /><div className="app-shell"><Sidebar /><main className="main-content" id="mainContent"><Outlet /></main><RightSidebar /></div><Footer /></>; }
