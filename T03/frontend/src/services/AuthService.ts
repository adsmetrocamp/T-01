import { UserLoginFormType } from '../models/user/UserLoginFormType';
import { UserLoginResponse } from '../models/user/UserLoginResponse';
import {
    UserPasswordRegisterFormType,
    UserRegisterFormType,
} from '../models/user/UserRegisterFormType';
import { api } from './BaseService';

class AuthService {
    login(login: UserLoginFormType) {
        return api.post<UserLoginResponse>('/users/login', login);
    }

    register(user: UserRegisterFormType & UserPasswordRegisterFormType) {
        return api.post<UserLoginResponse>('/users/register', user);
    }
}

export default new AuthService();
