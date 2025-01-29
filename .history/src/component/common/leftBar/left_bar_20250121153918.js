import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const LeftBar = ({ items }) => {
    return (
        <div className="left-bar" style={{ width: '200px', padding: '10px', backgroundColor: '#f4f4f4' }}>
            <Menu mode="inline" items={items}>
                {items.map(item => (
                    <Menu.Item key={item.key}>
                        <Link to={item.link}>{item.title}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </div>
    );
};

export default LeftBar;
