import { EventCategory } from './EventCategory';

export class EventRegisterFormType {
    name: string = '';
    description: string = '';
    price!: number;
    eventDate!: Date;
    categoryId!: string;
    totalTickets?: number;
    about: string = '';
    image?: File | string;
}
