import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Typography, Card, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService'; // API service for login
import AppHeader from '../component/common/app_header';

const Signin = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Check if the user is already signed in
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            navigate('/home'); // Redirect to dashboard if already signed in
        }
    }, [navigate]);

    const handleSubmit = async (values) => {
        setIsLoading(true);
        const { username, password } = values;

        try {
            const result = await login(username, password); // Call the API with email and password

            if (result.success) {
                localStorage.setItem('jwtToken', result.token); // Store the token in localStorage
                navigate('/home'); // Redirect to the dashboard
            } else {
                setError(result.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Something went wrong. Please try again later.');
        }

        setIsLoading(false);
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                padding: '20px',
            }}
        >
            <Card
                style={{
                    maxWidth: 400,
                    width: '100%',
                    borderRadius: 8,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
                styles={{ padding: 40 }}
            >
                <Space> </Space>
                <AppHeader
                    description="Welcome!"
                />
                <Space> </Space>

                {error && (
                    <Typography.Text type="danger" style={{ marginBottom: 16, display: 'block' }}>
                        {error}
                    </Typography.Text>
                )}
               
                <Form
                    form={form}
                    layout="vertical"
                    margin
                    onFinish={handleSubmit}
                    requiredMark={false}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Username is required' }]}
                    >
                        <Input type="username" placeholder="Your username" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Password is required' }]}
                    >
                        <Input.Password placeholder="Your password" />
                    </Form.Item>

                    {/* <Form.Item>
            <Button
              type="link"
              onClick={() => navigate('/reset-password')}
              style={{ padding: 0 }}
            >
              Forgot password?
            </Button>
          </Form.Item> */}

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={isLoading}
                        >
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>

                {/* <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Typography.Text type="secondary">No account?</Typography.Text>{' '}
          <Button
            type="link"
            onClick={() => navigate('/register')}
            style={{ padding: 0 }}
          >
            Sign up
          </Button>
        </div> */}
            </Card>
        </div>
    );
};

export default Signin;
