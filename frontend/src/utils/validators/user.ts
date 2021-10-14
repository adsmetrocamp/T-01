import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { UserLoginFormType } from '../../models/user/UserLoginFormType';
import '../../config/locale';
import {
    UserPasswordRegisterFormType,
    UserRegisterFormType,
} from '../../models/user/UserRegisterFormType';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export const loginFormSchema: SchemaOf<UserLoginFormType> = yup
    .object({
        email: yup.string().email().required().defined().label('Email'),
        password: yup.string().min(8).defined().label('Senha'),
        shouldRemember: yup.boolean().defined(),
    })
    .defined();

export const registerFormSchema: SchemaOf<UserRegisterFormType> = yup
    .object({
        name: yup.string().min(10).required().defined().label('Nome'),
        email: yup.string().email().required().defined().label('Email'),
        cpf: yup
            .string()
            .defined()
            .required()
            .label('CPF')
            .test('isValidCpf', 'Insira um CPF válido', (v) =>
                cpfValidator.isValid(v as string)
            ),
        birthDate: yup
            .date()
            .max(new Date())
            .required()
            .defined()
            .label('Data de Nascimento') as any,
        acceptedTerms: yup.boolean().defined().isTrue(),
    })
    .defined();

export const userPasswordRegisterSchema: SchemaOf<UserPasswordRegisterFormType> =
    yup
        .object({
            password: yup.string().min(8).defined().label('Senha'),
            passwordConfirmation: yup
                .string()
                .defined()
                .required()
                .label('Confirmação de Senha')
                .oneOf([yup.ref('password'), null], 'As senhas não coincidem'),
        })
        .defined();
