import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchConfig } from '../services/configService';
import '../css/Dashboard.css';
import UserListPage from '../component/User/user_list';
import { Tabs } from 'antd';
import UserDetailsPage from '../component/User/user_details';
import { Topbar } from '../component/common/top_bar';
import { Leftbar } from '../component/common/left_bar';


const { TabPane } = Tabs;

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
        { key: '1', label: 'Dashboard' },
        { key: '2', label: 'Users' },
        { key: '3', label: 'Settings' },
    ];

    return (
        <div className="dashboard-wrapper">
            
        </div>
    );
};

export default Dashboard;