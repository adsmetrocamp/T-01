import { EventRegisterFormType } from '../models/events/EventRegisterFormType';
import { api } from './BaseService';

class EventCategoryService {
    getAllCategories() {
        return api.get('/events/categories');
    }
}

export default new EventCategoryService();
