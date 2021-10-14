import React from 'react';

import { ChakraProvider, theme } from '@chakra-ui/react';
import { AppRoutes } from './config/routes/app.routes';
import { AuthProvider } from './contexts/AuthContext';

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
