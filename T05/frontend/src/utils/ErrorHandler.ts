import { createStandaloneToast } from '@chakra-ui/react';

class ErrorHandler {
    handleError(
        err: any,
        message = 'Ocorreu um erro. Tente novamente mais tarde'
    ) {
        const toast = createStandaloneToast();

        toast({
            title: 'Erro',
            status: 'error',
            duration: 2000,
            description:
                typeof err?.response?.data?.message === 'string'
                    ? err?.response?.data?.message
                    : message,
        });
    }
}

export default new ErrorHandler();
