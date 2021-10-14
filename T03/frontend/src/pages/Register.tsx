import React, { useState } from 'react';

import { RegisterForm } from '../components/Register/RegisterForm';
import { RegisterPassword } from '../components/Register/RegisterPassword';
import { AuthLayout } from '../components/Layouts/AuthLayout';
import { useFormik } from 'formik';
import {
    UserPasswordRegisterFormType,
    UserRegisterFormType,
} from '../models/user/UserRegisterFormType';
import {
    registerFormSchema,
    userPasswordRegisterSchema,
} from '../utils/validators/user';
import AuthService from '../services/AuthService';
import { useToast } from '@chakra-ui/toast';
import { AxiosError } from 'axios';
import ErrorHandler from '../utils/ErrorHandler';
import { Redirect, useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

interface Props {}

export const Register = (props: Props) => {
    const [step, setStep] = useState<'DATA' | 'PASSWORD'>('DATA');

    const auth = useAuth();

    const toast = useToast();

    const history = useHistory();

    const registerForm = useFormik<UserRegisterFormType>({
        initialValues: new UserRegisterFormType(),
        onSubmit: () => setStep('PASSWORD'),
        validationSchema: registerFormSchema,
    });

    const registerPasswordForm = useFormik<UserPasswordRegisterFormType>({
        initialValues: new UserPasswordRegisterFormType(),
        onSubmit: handleRegisterUser,
        validationSchema: userPasswordRegisterSchema,
    });

    async function handleRegisterUser() {
        try {
            await AuthService.register({
                ...registerForm.values,
                ...registerPasswordForm.values,
            });

            await auth.login({
                email: registerForm.values.email,
                password: registerPasswordForm.values.password,
                shouldRemember: true,
            });

            history.push('/');
        } catch (err) {
            ErrorHandler.handleError(
                err,
                'Ocorreu um erro ao fazer seu cadastro'
            );
        }
    }

    if (auth.loggedUser) {
        return <Redirect to="/" />;
    }

    return (
        <AuthLayout>
            {step === 'DATA' && <RegisterForm registerForm={registerForm} />}
            {step === 'PASSWORD' && (
                <RegisterPassword
                    registerPasswordForm={registerPasswordForm}
                    onBack={() => setStep('DATA')}
                />
            )}
        </AuthLayout>
    );
};
