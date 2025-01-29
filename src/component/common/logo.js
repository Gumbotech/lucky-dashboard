import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Typography } from 'antd';

const Logo = ({ height = 50, isLabel = false, style, ...props }) => {
  const router = useNavigate();

  const goTo = (url) => {
    router(url);
  };

  return (
    <Flex align="center" gap={10} onClick={() => goTo('/home')}>
      <img
        src="https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/ONwCrP-luckydays-upfo"
        {...props}
        alt="Logo"
        height={height}
        style={{
          borderRadius: '5px',
          cursor: 'pointer',
          objectFit: 'contain',
          height: `${height}px`,
          ...style,
        }}
        onError={(event) => {
          const target = event.target;
          target.onerror = null;
          target.src = 'https://i.imgur.com/2dcDGIE.png';
        }}
      />
      {isLabel && (
        <Typography.Title level={4} style={{ margin: '0px' }}>
          lucky days
        </Typography.Title>
      )}
    </Flex>
  );
};

export default Logo;
