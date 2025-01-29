import React from 'react';
import { Flex, Typography } from 'antd';
import Logo from './logo';

const { Text, Title } = Typography;

const AppHeader = ({ title = 'Lucky Days \n Dashboard', description }) => {
  return (
    <>
      <Flex justify="center">
        {/* <Logo height="100" /> */}
      </Flex>

      <Flex vertical align="center">
        <Title level={3} style={{ marginBottom: 0 ,whiteSpace: 'pre-line'}}>
          {title}
        </Title>
        {description && <Text type="secondary">{description}</Text>}
      </Flex>
    </>
  );
};

export default AppHeader;
