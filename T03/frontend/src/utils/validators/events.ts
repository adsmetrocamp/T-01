import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { UserLoginFormType } from '../../models/user/UserLoginFormType';
import '../../config/locale';
import {
    UserPasswordRegisterFormType,
    UserRegisterFormType,
} from '../../models/user/UserRegisterFormType';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { EventRegisterFormType } from '../../models/events/EventRegisterFormType';
import moment from 'moment';

export const eventRegisterSchema: SchemaOf<EventRegisterFormType> = yup
    .object({
        name: yup.string().min(10).required().label('Nome do Evento').defined(),
        about: yup.string().required().label('Sobre o Evento').defined(),
        totalTickets: yup
            .number()
            .min(1)
            .label('Número de Bilhetes')
            .required()
            .defined(),
        description: yup
            .string()
            .min(25)
            .required()
            .defined()
            .label('Descrição')
            .defined(),
        price: yup.number().positive().label('Preço').required().defined(),
        eventDate: yup
            .date()
            .required()
            .min(
                moment().add(1, 'd').toDate(),
                'A data do evento deve ser pelo menos 1 dia após hoje'
            )
            .label('Data do Evento') as any,
        image: yup.mixed().required().nullable() as any,
        categoryId: yup.string().required().label('Categoria'),
    })
    .defined() as any;
