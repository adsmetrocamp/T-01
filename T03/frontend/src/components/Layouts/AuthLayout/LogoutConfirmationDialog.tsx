import {
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
} from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext';

interface Props {
    onClose: () => void;
    isOpen: boolean;
}

export const LogoutConfirmationDialog = ({ onClose, isOpen }: Props) => {
    const auth = useAuth();

    const history = useHistory();

    return (
        <AlertDialog
            motionPreset="slideInBottom"
            onClose={onClose}
            isOpen={isOpen}
            leastDestructiveRef={null as any}
            isCentered
        >
            <AlertDialogOverlay />

            <AlertDialogContent>
                <AlertDialogHeader>Sair da conta?</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    Deseja realmente sair da conta?
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button onClick={onClose}>Não</Button>
                    <Button
                        colorScheme="red"
                        ml={3}
                        onClick={() => {
                            auth.logout();
                            history.push('/login');
                        }}
                    >
                        Sair da Conta
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
