import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { UserLoginFormType } from '../models/user/UserLoginFormType';
import { UserLoginResponse } from '../models/user/UserLoginResponse';
import AuthService from '../services/AuthService';
import crypto, { enc } from 'crypto-js';

interface AuthContextTypes {
    loggedUser: UserLoginResponse | null;
    login(credentials: UserLoginFormType): Promise<void>;
    logout(): void;
}

const AuthContext = createContext<AuthContextTypes>({} as AuthContextTypes);

const AUTH_STORAGE_KEY = '@auth';
const AUTH_CRYPT_KEY = '9044ba76-216d-11ec-9621-0242ac130002';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [loggedUser, setLoggedUser] = useState<UserLoginResponse | null>(
        null
    );

    useEffect(() => {
        const storagedUser: string | null =
            localStorage.getItem(AUTH_STORAGE_KEY);

        if (storagedUser) {
            setLoggedUser(
                JSON.parse(
                    crypto.AES.decrypt(
                        storagedUser as string,
                        AUTH_CRYPT_KEY
                    ).toString(enc.Utf8)
                )
            );
        }
    }, []);

    async function login(credentials: UserLoginFormType) {
        const user = await AuthService.login(credentials);

        localStorage.setItem(
            AUTH_STORAGE_KEY,
            crypto.AES.encrypt(
                JSON.stringify(user.data),
                AUTH_CRYPT_KEY
            ).toString()
        );

        setLoggedUser(user.data);
    }

    function logout() {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setLoggedUser(null);
    }

    return (
        <AuthContext.Provider value={{ loggedUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
