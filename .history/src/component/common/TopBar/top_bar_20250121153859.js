import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Tag, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const TopBar = ({ keySelected, items }) => {
    const navigate = useNavigate();
    const user = { name: 'John Doe', pictureUrl: 'https://example.com/picture.jpg' }; // Sample user data

    return (
        <div className="top-bar" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#fff' }}>
            <div>
                <h2>Logo</h2> {/* You can replace this with actual logo if needed */}
            </div>

            <Menu mode="horizontal" selectedKeys={[keySelected]} items={items} overflowedIndicator={<MenuOutlined />} />

            <div>
                {user && (
                    <Avatar
                        src={user.pictureUrl}
                        alt={user.name}
                        size="default"
                        onClick={() => navigate('/profile')}
                        style={{ cursor: 'pointer' }}
                    >
                        {user.name[0]}
                    </Avatar>
                )}
                <Tag color="red">Admin</Tag>
            </div>
        </div>
    );
};

export default TopBar;
