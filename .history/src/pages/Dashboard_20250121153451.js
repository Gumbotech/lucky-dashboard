import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchConfig } from '../services/configService';
import '../css/Dashboard.css';
import UserListPage from '../component/User/user_list';
import UserDetailsPage from '../component/User/user_details';
import { Tabs, Button, Spin, Layout, notification } from 'antd';


const { TabPane } = Tabs;
const { Content, Sider } = Layout;

const Dashboard = () => {
    const [configData, setConfigData] = useState(null);
    const [activeTab, setActiveTab] = useState('userList');
    const [selectedUser, setSelectedUser] = useState(null);
    const [loadingConfig, setLoadingConfig] = useState(true); // Loading state for config
    const navigate = useNavigate();

    const handleManageClick = (user) => {
        setSelectedUser(user);
        setActiveTab('userDetails');
    };

    const handleBackToList = () => {
        setActiveTab('userList');
        setSelectedUser(null);
    };

    // Load configuration data
    useEffect(() => {
        const loadConfig = async () => {
            try {
                const data = await fetchConfig();
                setConfigData(data);
                setLoadingConfig(false); // Set loading to false when data is loaded
            } catch (error) {
                console.error('Failed to load config:', error);
                setLoadingConfig(false);
                notification.error({
                    message: 'Error',
                    description: 'Failed to load configuration data. Please try again later.',
                });
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
        <Layout style={{ minHeight: '100vh' }}>
            {/* Sidebar (Left bar) */}
            <Sider width={250} theme="light" className="sidebar">
                <Sidebar />
            </Sider>

            <Layout style={{ flex: 1 }}>
                {/* Topbar (Header) */}
                <Topb />

                <Content style={{ padding: '24px' }}>
                    {/* Show a loading spinner until the config data is loaded */}
                    {loadingConfig ? (
                        <div className="loading-container">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <Tabs activeKey={activeTab} onChange={setActiveTab}>
                            <TabPane tab="User List" key="userList">
                                <UserListPage onManageClick={handleManageClick} />
                            </TabPane>
                            <TabPane tab="User Details" key="userDetails">
                                <UserDetailsPage user={selectedUser} onBack={handleBackToList} />
                            </TabPane>
                        </Tabs>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
