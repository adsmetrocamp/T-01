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
    image?: string;
    createdBy?: string;
    createdAt?: Date;
}
