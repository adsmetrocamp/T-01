import {
    Box,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
} from '@chakra-ui/react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormikProps } from 'formik';
import { UserPasswordRegisterFormType } from '../../models/user/UserRegisterFormType';

interface Props {
    registerPasswordForm: FormikProps<UserPasswordRegisterFormType>;
    onBack: () => void;
}

export const RegisterPassword = ({ registerPasswordForm, onBack }: Props) => {
    return (
        <Box width="70%">
            <form onSubmit={registerPasswordForm.handleSubmit}>
                <Heading size="lg">Cadastro de Senha</Heading>
                <Text size="sm" color="gray.400" mt={2}>
                    Insira uma senha forte para ter acesso ao sistema
                </Text>

                <Box mt={8}>
                    <FormControl
                        mt={4}
                        isInvalid={!!registerPasswordForm.errors.password}
                    >
                        <FormLabel>Senha</FormLabel>
                        <Input
                            placeholder="Digite sua senha"
                            type="password"
                            name="password"
                            onChange={registerPasswordForm.handleChange}
                            value={registerPasswordForm.values.password}
                            maxLength={255}
                        />

                        <Text color="red.600" mt={1}>
                            {registerPasswordForm.errors.password}
                        </Text>
                    </FormControl>
                    <FormControl
                        mt={4}
                        isInvalid={
                            !!registerPasswordForm.errors.passwordConfirmation
                        }
                    >
                        <FormLabel>Confirmação de senha</FormLabel>
                        <Input
                            placeholder="Digite a confirmação de senha"
                            type="password"
                            name="passwordConfirmation"
                            onChange={registerPasswordForm.handleChange}
                            value={
                                registerPasswordForm.values.passwordConfirmation
                            }
                            maxLength={255}
                        />

                        <Text color="red.600" mt={1}>
                            {registerPasswordForm.errors.passwordConfirmation}
                        </Text>
                    </FormControl>

                    <br />

                    <Button
                        variant="solid"
                        px={5}
                        bg="purple.500"
                        color="white"
                        type="submit"
                        rightIcon={<FontAwesomeIcon icon={faCheck} />}
                        _hover={{ bg: 'purple.700' }}
                        isLoading={registerPasswordForm.isSubmitting}
                    >
                        Finalizar Cadastro
                    </Button>

                    <Button variant="outline" px={5} ml={3} onClick={onBack}>
                        Voltar
                    </Button>
                </Box>
            </form>
        </Box>
    );
};
