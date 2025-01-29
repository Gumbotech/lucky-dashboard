import React from 'react';
import { Avatar, Button, Flex } from 'antd';

const handleSignOut = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('appUserId');
    localStorage.removeItem('role');
    navigate('/');
};

const Topbar = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: '#f0f2f5', borderBottom: '1px solid #e8e8e8' }}>
            <Flex style={{ alignItems: 'center' }}>
                {/* <Avatar
                    size="large"
                    icon={<GiftOutlined />} // Use a Lucky icon or any icon of your choice
                    style={{ backgroundColor: '#87d068', marginRight: '8px' }}
                /> */}
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Lucky Days Dashboard</span>
            </Flex>

            <Button
                type="primary"
                style={{ marginLeft: 'auto' }}
                onClick={(}
            >
                Sign Out
            </Button>
        </div>
    );
};

export default Topbar;