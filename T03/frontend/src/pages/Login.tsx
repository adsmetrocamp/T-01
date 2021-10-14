import React from 'react';

import { LoginForm } from '../components/Login/LoginForm';
import { AuthLayout } from '../components/Layouts/AuthLayout';

interface Props {}

export const Login = (props: Props) => {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
};
