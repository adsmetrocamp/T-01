import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { AuthBanner } from './AuthLayout/AuthBanner';
import { AppBar } from './AppBar';

interface Props {
    children: ReactNode;
}

export const AuthLayout = (props: Props) => {
    return (
        <Box height="100vh">
            <AppBar />
            <Box display="flex" height="100%">
                <Box
                    height="100%"
                    flex={0.4}
                    bg="white"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    {props.children}
                </Box>
                <AuthBanner />
            </Box>
        </Box>
    );
};
