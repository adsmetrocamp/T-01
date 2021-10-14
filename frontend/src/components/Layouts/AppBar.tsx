import React from 'react';

import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    useDisclosure,
} from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRight,
    faChevronDown,
    faChevronRight,
    faPlus,
    faSearch,
    faUser,
    faUserAlt,
} from '@fortawesome/free-solid-svg-icons';

import { Link as RouterLink } from 'react-router-dom';

import Logo from '../../assets/images/logo.jpg';
import { useAuth } from '../../contexts/AuthContext';
import { LogoutConfirmationDialog } from './AuthLayout/LogoutConfirmationDialog';

interface Props {}

export const AppBar = (props: Props) => {
    const auth = useAuth();

    const { onOpen, isOpen, onClose } = useDisclosure();

    return (
        <Box
            width="100%"
            height={'85px'}
            bgColor="white"
            // boxShadow='0 4px 12px -4px rgb(0 0 0 / 10%)'
            position="fixed"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            pl={10}
            zIndex={99}
        >
            <Box display="flex">
                <Box mr={10} alignSelf="center">
                    <RouterLink to="/">
                        <img
                            src={Logo}
                            alt="Logo"
                            width={200}
                            style={{ borderRadius: 5 }}
                        />
                    </RouterLink>
                </Box>

                <Box width={400}>
                    <InputGroup size="lg" width="100%">
                        <InputLeftElement
                            pointerEvents="none"
                            children={
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    color="#9FB4CE"
                                />
                            }
                        />
                        <Input
                            variant="filled"
                            placeholder="Procurar evento"
                            fontWeight="bold"
                            fontSize="sm"
                        />
                    </InputGroup>
                </Box>
            </Box>

            <Box display="flex" alignItems="center" height="100%">
                <RouterLink to="/event/register">
                    <Button
                        variant="solid"
                        px={5}
                        mr={3}
                        bg="purple.500"
                        color="white"
                        type="submit"
                        _hover={{ bg: 'purple.700' }}
                        rightIcon={<FontAwesomeIcon icon={faPlus} />}
                    >
                        Criar novo evento
                    </Button>
                </RouterLink>

                {auth.loggedUser && (
                    <>
                        <Menu>
                            <MenuButton
                                px={4}
                                py={2}
                                transition="all 0.2s"
                                borderRadius="md"
                                borderWidth="1px"
                                mr={5}
                                fontWeight="600"
                                color="purple.500"
                            >
                                <FontAwesomeIcon
                                    icon={faUserAlt}
                                    style={{ marginRight: 10 }}
                                ></FontAwesomeIcon>
                                {auth.loggedUser.name}
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    style={{ marginLeft: 10 }}
                                ></FontAwesomeIcon>
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Perfil</MenuItem>
                                <MenuItem
                                    color="red.500"
                                    onClick={() => onOpen()}
                                >
                                    Sair da conta
                                </MenuItem>
                            </MenuList>
                        </Menu>
                        <LogoutConfirmationDialog
                            isOpen={isOpen}
                            onClose={onClose}
                        />
                    </>
                )}

                {!auth.loggedUser && (
                    <RouterLink to="/login" style={{ height: '100%' }}>
                        <Box
                            cursor="pointer"
                            _hover={{ bgColor: 'gray.100' }}
                            height="100%"
                            display="flex"
                            alignItems="center"
                            px={10}
                            fontWeight="bold"
                            color="purple.800"
                        >
                            <FontAwesomeIcon icon={faUserAlt}></FontAwesomeIcon>
                            <Box ml={3}>Fazer Login</Box>
                        </Box>
                    </RouterLink>
                )}
            </Box>
        </Box>
    );
};
