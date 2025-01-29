import React from 'react';

export const Leftbar = ({ items, keySelected, onItemClick }) => {
    return (
        <div style={{ width: 200, borderRight: '1px solid #ccc', padding: '20px' }}>
            <ul>
                {items.map(item => (
                    <li
                        key={item.key}
                        style={{
                            padding: '10px',
                            cursor: 'pointer',
                            backgroundColor: keySelected === item.key ? '#e6f7ff' : 'transparent',
                        }}
                        onClick={() => onItemClick(item.key)}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};
