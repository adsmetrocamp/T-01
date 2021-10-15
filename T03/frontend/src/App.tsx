import React from 'react';

import { ChakraProvider, theme } from '@chakra-ui/react';
import { AppRoutes } from './config/routes/app.routes';
import { AuthProvider } from './contexts/AuthContext';
import 'moment/locale/pt-br';
import moment from 'moment';

moment.locale('pt');

function App() {
    return (
        <AuthProvider>
            <ChakraProvider theme={theme}>
                <AppRoutes />
            </ChakraProvider>
        </AuthProvider>
    );
}

export default App;
