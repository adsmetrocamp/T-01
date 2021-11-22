import { EventData } from '../models/events/EventData';
import { EventRegisterFormType } from '../models/events/EventRegisterFormType';
import { api } from './BaseService';

class EventService {
    getEventById(id: string) {
        return api.get<EventData>('/events/' + id);
    }

    getAllEvents() {
        return api.get<EventData[]>('/events');
    }

    createEvent(eventData: EventRegisterFormType) {
        return api.post<EventData>('/events', eventData);
    }

    updateEvent(eventId: string, eventData: EventRegisterFormType) {
        return api.put<EventData>('/events/' + eventId, eventData);
    }
}

export default new EventService();
