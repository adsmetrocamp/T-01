import { EventRegisterFormType } from '../models/events/EventRegisterFormType';
import { api } from './BaseService';

class EventService {
    createEvent(eventData: EventRegisterFormType) {
        return api.post('/events', eventData);
    }

    updateEvent(eventId: string, eventData: EventRegisterFormType) {
        return api.put('/events/' + eventId, eventData);
    }
}

export default new EventService();
