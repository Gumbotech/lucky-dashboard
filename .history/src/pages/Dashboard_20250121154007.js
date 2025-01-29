import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchConfig } from '../services/configService';
import '../css/Dashboard.css';
import UserListPage from '../component/User/user_list';
import { Tabs } from 'antd';
import UserDetailsPage from '../component/User/user_details';

const { TabPane } = Tabs;

const Dashboard = () => {
    const [configData, setConfigData] = useState(null);
    const [activeGlobalTab, setActiveGlobalTab] = useState('posts'); // Default to 'Posts' tab
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('userList');
    const [selectedUser, setSelectedUser] = useState(null);

    const handleManageClick = (user) => {
        setSelectedUser(user);
        setActiveTab('userDetails');
    };

    const handleBackToList = () => {
        setActiveTab('userList');
        setSelectedUser(null);
    };


    useEffect(() => {
        // Fetch config data when the dashboard loads
        const loadConfig = async () => {
            try {
                const data = await fetchConfig();
                setConfigData(data);
            } catch (error) {
                console.error('Failed to load config:', error);
            }
        };
        loadConfig();
    }, []);

    // Handle sign-out functionality
    const handleSignOut = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('appUserId');
        localStorage.removeItem('role');
        navigate('/');
    };


    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-header">
                <h2>Poster Dashboard</h2>
                <button className="signout-btn" onClick={handleSignOut}>
                    Sign Out
                </button>
            </div>
            <div style={{ padding: '24px' }}>
                <Tabs activeKey={activeTab} onChange={setActiveTab}>
                    <TabPane tab="User List" key="userList">
                        <UserListPage onManageClick={handleManageClick} />
                    </TabPane>
                    <TabPane tab="User Details" key="userDetails">
                        <UserDetailsPage user={selectedUser} onBack={handleBackToList} />
                    </TabPane>
                </Tabs>
            </div>
        </div>

    );
};

export default Dashboard;
