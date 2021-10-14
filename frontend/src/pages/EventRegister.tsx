import React, { useCallback, useMemo, useState } from 'react';
import { EventCard } from '../components/Home/EventCard';
import { EventCategorySlider } from '../components/Home/EventCategorySlider';
import { BaseLayout } from '../components/Layouts/BaseLayout';
import { EventCategory } from '../models/events/EventCategory';
import { EventData } from '../models/events/EventData';

import { convertToRaw } from 'draft-js';

import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import { EventRegisterFormType } from '../models/events/EventRegisterFormType';
import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Heading,
    Text,
    Grid,
    GridItem,
    Button,
    InputGroup,
    InputLeftAddon,
    Select,
} from '@chakra-ui/react';
import ReactDatePicker from 'react-datepicker';
import ReactInputMask from 'react-input-mask';
import { Editor } from 'react-draft-wysiwyg';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { eventRegisterSchema } from '../utils/validators/events';
import useSWR from 'swr';
import EventCategoryService from '../services/EventCategoryService';

interface Props {}

export const EventRegister = (props: Props) => {
    const { data: categories } = useSWR<EventCategory[]>(
        '/events/categories',
        async () => (await EventCategoryService.getAllCategories()).data
    );

    const registerEventForm = useFormik<EventRegisterFormType>({
        initialValues: new EventRegisterFormType(),
        onSubmit: () => {},
        validationSchema: eventRegisterSchema,
    });

    const onDropEventThumbnail = useCallback((files) => {
        if (files[0]) {
            registerEventForm.setFieldValue('image', files[0]);
        }
    }, []);

    const dropzone = useDropzone({
        accept: 'image/*',
        onDrop: onDropEventThumbnail,
    });

    const imageThumb = useMemo(() => {
        if (!registerEventForm.values.image) return null;

        return `url(${window.URL.createObjectURL(
            registerEventForm.values.image
        )})`;
    }, [registerEventForm.values.image]);

    return (
        <BaseLayout>
            <form onSubmit={registerEventForm.handleSubmit}>
                <Box pt={'80px'} px={'15%'} bgColor="#fff" pb={10}>
                    <Heading mb={10}>
                        <Heading display="inline" color="purple.500">
                            Cadastrar
                        </Heading>{' '}
                        Evento
                    </Heading>

                    <Box
                        width={600}
                        height={300}
                        bgColor="gray.100"
                        borderWidth="2px"
                        borderColor="gray.300"
                        borderStyle="dashed"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        cursor="pointer"
                        opacity={dropzone.isDragActive ? 0.4 : 1}
                        {...dropzone.getRootProps()}
                        bgImage={imageThumb ?? ''}
                        bgSize={'cover'}
                        bgPosition="center center"
                    >
                        <input
                            type="file"
                            hidden
                            {...dropzone.getInputProps()}
                        />

                        <Box textAlign="center" hidden={!!imageThumb}>
                            <FontAwesomeIcon
                                icon={faCamera}
                                size="4x"
                                color="#a9bbcf"
                            />

                            <Text
                                color="gray.500"
                                fontWeight="bold"
                                fontSize="20"
                                mt={3}
                            >
                                Insira a imagem do evento
                            </Text>
                            <Text color="gray.500">
                                Ou arraste e solte a imagem aqui
                            </Text>
                        </Box>
                    </Box>

                    <Text color="gray.500" mt={5}>
                        Selecione uma imagem 600x300 para adequar corretamente
                        ao quadro
                    </Text>

                    <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={10}>
                        <GridItem>
                            <FormControl
                                isInvalid={
                                    !!registerEventForm.errors.categoryId
                                }
                            >
                                <FormLabel>Categoria</FormLabel>

                                <Select
                                    placeholder="Selecione a categoria do evento"
                                    name="categoryId"
                                    onChange={registerEventForm.handleChange}
                                    value={registerEventForm.values.categoryId}
                                >
                                    {categories?.map((c) => (
                                        <option value={c.id as string}>
                                            {c.name}
                                        </option>
                                    ))}
                                </Select>

                                <Text color="red.600" mt={1}>
                                    {registerEventForm.errors.categoryId}
                                </Text>
                            </FormControl>
                        </GridItem>

                        <GridItem />

                        <GridItem>
                            <FormControl
                                isInvalid={!!registerEventForm.errors.name}
                            >
                                <FormLabel>Nome</FormLabel>
                                <Input
                                    placeholder="Digite o nome do evento"
                                    name="name"
                                    onChange={registerEventForm.handleChange}
                                    maxLength={255}
                                    value={registerEventForm.values.name}
                                />
                                <Text color="red.600" mt={1}>
                                    {registerEventForm.errors.name}
                                </Text>
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl
                                isInvalid={
                                    !!registerEventForm.errors.description
                                }
                            >
                                <FormLabel>Descrição</FormLabel>
                                <Input
                                    placeholder="Digite a descrição do evento"
                                    name="description"
                                    onChange={registerEventForm.handleChange}
                                    maxLength={255}
                                    value={registerEventForm.values.description}
                                />
                                <Text color="red.600" mt={1}>
                                    {registerEventForm.errors.description}
                                </Text>
                            </FormControl>
                        </GridItem>
                    </Grid>

                    <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={5}>
                        <GridItem>
                            <FormControl
                                isInvalid={!!registerEventForm.errors.eventDate}
                            >
                                <FormLabel>Data do evento</FormLabel>
                                <ReactDatePicker
                                    selected={
                                        registerEventForm.values.eventDate
                                    }
                                    dateFormat="dd/MM/yyyy"
                                    onChange={(e) =>
                                        registerEventForm.setFieldValue(
                                            'eventDate',
                                            e
                                        )
                                    }
                                    placeholderText="Selecione a data do evento"
                                    calendarStartDay={2}
                                    customInput={
                                        <ReactInputMask
                                            mask="99/99/9999"
                                            maskPlaceholder={null}
                                            placeholder="Selecione a data do evento"
                                            autoComplete="off"
                                        >
                                            <Input
                                                placeholder="Selecione a data do evento"
                                                maxLength={11}
                                            />
                                        </ReactInputMask>
                                    }
                                />

                                <Text color="red.600" mt={1}>
                                    {registerEventForm.errors.eventDate}
                                </Text>
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl
                                isInvalid={!!registerEventForm.errors.price}
                            >
                                <FormLabel>Preço</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon children="R$" />
                                    <Input
                                        placeholder="Insira o preço do bilhete "
                                        name="price"
                                        type="number"
                                        onChange={
                                            registerEventForm.handleChange
                                        }
                                        maxLength={255}
                                        value={registerEventForm.values.price}
                                    />
                                </InputGroup>

                                <Text color="red.600" mt={1}>
                                    {registerEventForm.errors.price}
                                </Text>
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl
                                isInvalid={
                                    !!registerEventForm.errors.totalTickets
                                }
                            >
                                <FormLabel>Número de Bilhetes</FormLabel>

                                <Input
                                    placeholder="Insira o número de bilhetes disponíveis para o evento"
                                    name="totalTickets"
                                    type="number"
                                    onChange={registerEventForm.handleChange}
                                    maxLength={255}
                                    value={
                                        registerEventForm.values.totalTickets
                                    }
                                />

                                <Text color="red.600" mt={1}>
                                    {registerEventForm.errors.totalTickets}
                                </Text>
                            </FormControl>
                        </GridItem>
                    </Grid>

                    <FormLabel mt={5}>Sobre o Evento</FormLabel>
                    <Box
                        borderWidth={0.5}
                        borderColor="gray.100"
                        borderRadius={5}
                    >
                        <Editor
                            toolbar={{
                                fontFamily: {
                                    options: [],
                                    inDropdown: false,
                                    className: undefined,
                                    component: undefined,
                                    dropdownClassName: undefined,
                                },
                            }}
                            editorStyle={{
                                height: 500,
                                paddingLeft: 20,
                            }}
                            onEditorStateChange={(e) => {
                                registerEventForm.setFieldValue(
                                    'about',
                                    draftToHtml(
                                        convertToRaw(e.getCurrentContent())
                                    )
                                );
                            }}
                        />
                    </Box>

                    <Button
                        variant="solid"
                        px={5}
                        mt={10}
                        bg="purple.500"
                        color="white"
                        type="submit"
                        _hover={{ bg: 'purple.700' }}
                        rightIcon={<FontAwesomeIcon icon={faCheck} />}
                        disabled={!registerEventForm.isValid}
                    >
                        Salvar evento
                    </Button>
                </Box>
            </form>
        </BaseLayout>
    );
};
