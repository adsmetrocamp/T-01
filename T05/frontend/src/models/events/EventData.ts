import { UserLoginResponse } from '../user/UserLoginResponse';
import { EventCategory } from './EventCategory';

export class EventData {
    id: string = '';
    name: string = '';
    description: string = '';
    price!: number;
    eventDate!: Date;
    category!: EventCategory;
    availableTickets?: number;
    totalParticipants?: number;
    totalTickets?: number;
    image?: string;
    createdByUser?: UserLoginResponse;
    createdAt?: Date;
    about?: string;
}
