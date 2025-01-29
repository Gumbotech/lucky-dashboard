import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchConfig } from '../services/configService';
import '../css/Dashboard.css';
import UserListPage from '../component/user/userList';

import { Leftbar } from '../component/common/left_bar';
import Topbar from '../component/common/top_bar';
import LuckStatusManager from '../component/LuckStatus/luck_status';
import UserDetailsPage from '../component/User/user_details';

const Dashboard = () => {
    const [configData, setConfigData] = useState(null);
    const [activeTab, setActiveTab] = useState('userList');
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    const handleManageClick = (user) => {
        setSelectedUser(user);
        setActiveTab('userDetails');
    };

    const handleBackToList = () => {
        setActiveTab('userList');
        setSelectedUser(null);
    };

    useEffect(() => {
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

    const handleSignOut = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('appUserId');
        localStorage.removeItem('role');
        navigate('/');
    };

    // Sample navigation items for the left bar
    const navigationItems = [
        { key: 'userList', label: 'User List' },
        { key: 'userDetails', label: 'User Details' },
        // { key: 'luckStatus', label: 'Luck Status' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'userList':
                return <UserListPage configData={configData} onManageClick={handleManageClick} />;
            case 'userDetails':
                return <UserDetailsPage configData={configData} user={selectedUser} onBack={handleBackToList} />;
            case 'luckStatus':
                return <LuckStatusManager configData={configData} />  
            default:
                return null;
        }
    };

    return (
        <div>
            <Topbar />
            <div style={{ display: 'flex' }}>
                {/* Leftbar with navigation */}
                <Leftbar
                    keySelected={activeTab}
                    items={navigationItems}
                    onItemClick={(key) => setActiveTab(key)} 
                />
                <div style={{ padding: '24px', flex: 1 }}>
                    {/* Content based on the active tab */}
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
