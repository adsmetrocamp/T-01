import {
    Box,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Divider,
    Button,
    Link,
    Checkbox,
} from '@chakra-ui/react';
import React from 'react';
import { useFormik } from 'formik';
import { UserLoginFormType } from '../../models/user/UserLoginFormType';
import { loginFormSchema } from '../../utils/validators/user';
import { Link as RouterLink, useHistory, Redirect } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import ErrorHandler from '../../utils/ErrorHandler';
import { useAuth } from '../../contexts/AuthContext';

interface Props {}

export const LoginForm = (props: Props) => {
    const { login, loggedUser } = useAuth();

    const history = useHistory();

    const loginForm = useFormik<UserLoginFormType>({
        initialValues: new UserLoginFormType(),
        onSubmit: handleSubmit,
        validationSchema: loginFormSchema,
    });

    async function handleSubmit() {
        try {
            await login(loginForm.values);
            history.push('/');
        } catch (err) {
            ErrorHandler.handleError(err, 'Ocorreu um erro ao fazer login');
        }
    }

    if (loggedUser) {
        return <Redirect to="/" />;
    }

    return (
        <Box width="70%">
            <form onSubmit={loginForm.handleSubmit}>
                <Heading size="lg">Entrar</Heading>
                <Text size="sm" color="gray.400" mt={2}>
                    Faça login para comprar seus ingressos
                </Text>

                <Box mt={8}>
                    <FormControl isInvalid={!!loginForm.errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            placeholder="Digite seu email"
                            name="email"
                            onChange={loginForm.handleChange}
                            maxLength={255}
                        />
                        <Text color="red.600" mt={1}>
                            {loginForm.errors.email}
                        </Text>
                    </FormControl>

                    <FormControl mt={4} isInvalid={!!loginForm.errors.password}>
                        <FormLabel>Senha</FormLabel>
                        <Input
                            placeholder="Digite sua senha"
                            type="password"
                            name="password"
                            onChange={loginForm.handleChange}
                            maxLength={255}
                        />

                        <Text color="red.600" mt={1}>
                            {loginForm.errors.password}
                        </Text>
                    </FormControl>

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={4}
                    >
                        <Checkbox
                            colorScheme="purple.500"
                            onChange={() =>
                                loginForm.setFieldValue(
                                    'shouldRemember',
                                    !loginForm.values.shouldRemember
                                )
                            }
                            isChecked={true}
                        >
                            Lembrar-se de mim
                        </Checkbox>

                        <Link mt={4} color="purple.500" fontWeight="600">
                            Esqueci a senha
                        </Link>
                    </Box>

                    <Button
                        mt={4}
                        variant="solid"
                        px={5}
                        bg="purple.500"
                        color="white"
                        type="submit"
                        _hover={{ bg: 'purple.700' }}
                        isLoading={loginForm.isSubmitting}
                    >
                        Fazer login
                    </Button>

                    <Divider my={10}></Divider>

                    <Text mt={4}>
                        Ainda não tem cadastro?{' '}
                        <RouterLink to="/register">
                            <Link mt={4} color="purple.500" fontWeight="600">
                                Cadastre-se aqui
                            </Link>
                        </RouterLink>
                    </Text>
                </Box>
            </form>
        </Box>
    );
};
