import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import { updateCulturalPlace } from '../../api/admin.api';

interface CulturalPlaceFormData {
  name: string;
  description: string;
  category: string;
  characteristics: { value: string }[];
  contact: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    phone: string;
    website: string;
    email: string;
  };
  image: string;
  rating: number;
  isActive: boolean;
}

interface CulturalPlace {
  _id: string;
  name: string;
  description: string;
  category: string;
  characteristics: string[];
  contact: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    phone: string;
    website: string;
    email: string;
  };
  image: string;
  rating: number;
  isActive?: boolean;
}

interface EditCulturalPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaceUpdated: () => void;
  place: CulturalPlace | null;
}

export const EditCulturalPlaceModal = ({
  isOpen,
  onClose,
  onPlaceUpdated,
  place,
}: EditCulturalPlaceModalProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CulturalPlaceFormData>();

  const {
    fields: characteristicFields,
    append: appendCharacteristic,
    remove: removeCharacteristic,
  } = useFieldArray({
    control,
    name: 'characteristics',
  });

  // Cargar datos del lugar cuando se abre el modal
  useEffect(() => {
    if (isOpen && place) {
      const formData: CulturalPlaceFormData = {
        name: place.name,
        description: place.description,
        category: place.category,
        characteristics: place.characteristics.map((char) => ({ value: char })),
        contact: {
          address: place.contact.address,
          coordinates: {
            lat: place.contact.coordinates.lat,
            lng: place.contact.coordinates.lng,
          },
          phone: place.contact.phone,
          website: place.contact.website,
          email: place.contact.email,
        },
        image: place.image,
        rating: place.rating,
        isActive: place.isActive ?? true,
      };

      reset(formData);
    }
  }, [isOpen, place, reset]);

  const addCharacteristic = () => {
    appendCharacteristic({ value: '' });
  };

  const removeCharacteristicItem = (index: number) => {
    if (characteristicFields.length > 1) {
      removeCharacteristic(index);
    }
  };

  const onSubmit = async (data: CulturalPlaceFormData) => {
    if (!place) return;

    try {
      // Convertir características de vuelta a string[]
      const submitData = {
        ...data,
        characteristics: data.characteristics
          .map((char) => char.value)
          .filter(Boolean),
      };

      const response = await fetch(updateCulturalPlace(place._id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        alert('Lugar cultural actualizado correctamente');
        onPlaceUpdated();
        handleClose();
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Error al actualizar el lugar cultural'
        );
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen || !place) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="rgba(0, 0, 0, 0.5)"
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        bg="white"
        borderRadius="lg"
        maxW="700px"
        w="full"
        maxH="90vh"
        overflow="auto"
      >
        <HStack
          justifyContent="space-between"
          p={6}
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Text fontSize="xl" fontWeight="bold">
            Editar Lugar Cultural
          </Text>
          <IconButton aria-label="Cerrar" variant="ghost" onClick={handleClose}>
            <FiX />
          </IconButton>
        </HStack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box p={6}>
            <VStack gap={6} align="stretch">
              <Box>
                <Text fontWeight="medium" mb={2}>
                  Nombre del Lugar *
                </Text>
                <Input
                  {...register('name', { required: true })}
                  placeholder="Ej: Museo de Arte Moderno"
                />
              </Box>

              <Box>
                <Text fontWeight="medium" mb={2}>
                  Descripción
                </Text>
                <Textarea
                  {...register('description')}
                  placeholder="Descripción del lugar cultural..."
                  rows={3}
                />
              </Box>

              <Box>
                <Text fontWeight="medium" mb={2}>
                  Categoría *
                </Text>
                <select
                  {...register('category', { required: true })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    backgroundColor: 'white',
                  }}
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Centro Cultural">Centro Cultural</option>
                  <option value="Museo">Museo</option>
                  <option value="Teatro">Teatro</option>
                  <option value="Biblioteca">Biblioteca</option>
                  <option value="Galería">Galería</option>
                  <option value="Cine">Cine</option>
                  <option value="Auditorio">Auditorio</option>
                </select>
              </Box>

              <Box>
                <Text fontWeight="medium" mb={2}>
                  URL de la Imagen
                </Text>
                <Input
                  {...register('image')}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  type="url"
                />
              </Box>

              <Box>
                <Text fontWeight="medium" mb={4} fontSize="lg">
                  Información de Contacto
                </Text>

                <VStack gap={4} align="stretch">
                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Dirección *
                    </Text>
                    <Input
                      {...register('contact.address', { required: true })}
                      placeholder="Ej: Av. Corrientes 123, Buenos Aires"
                    />
                  </Box>

                  <HStack gap={4}>
                    <Box flex="1">
                      <Text fontWeight="medium" mb={2}>
                        Latitud *
                      </Text>
                      <Input
                        type="number"
                        step="any"
                        {...register('contact.coordinates.lat', {
                          required: true,
                          valueAsNumber: true,
                        })}
                        placeholder="Ej: -34.6037"
                      />
                    </Box>

                    <Box flex="1">
                      <Text fontWeight="medium" mb={2}>
                        Longitud *
                      </Text>
                      <Input
                        type="number"
                        step="any"
                        {...register('contact.coordinates.lng', {
                          required: true,
                          valueAsNumber: true,
                        })}
                        placeholder="Ej: -58.3816"
                      />
                    </Box>
                  </HStack>

                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Teléfono
                    </Text>
                    <Input
                      {...register('contact.phone')}
                      placeholder="Ej: +54 11 1234-5678"
                    />
                  </Box>

                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Sitio Web
                    </Text>
                    <Input
                      {...register('contact.website')}
                      placeholder="https://ejemplo.com"
                      type="url"
                    />
                  </Box>

                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Email
                    </Text>
                    <Input
                      {...register('contact.email')}
                      placeholder="contacto@ejemplo.com"
                      type="email"
                    />
                  </Box>
                </VStack>
              </Box>

              <Box>
                <HStack justifyContent="space-between" mb={3}>
                  <Text fontWeight="medium">Características</Text>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                    onClick={addCharacteristic}
                    type="button"
                  >
                    <FiPlus style={{ marginRight: '4px' }} />
                    Agregar Característica
                  </Button>
                </HStack>

                <Stack gap={2}>
                  {characteristicFields.map((field, index) => (
                    <HStack key={field.id}>
                      <Input
                        {...register(`characteristics.${index}.value` as const)}
                        placeholder="Ej: Visitas guiadas"
                      />
                      {characteristicFields.length > 1 && (
                        <IconButton
                          size="sm"
                          colorScheme="red"
                          variant="outline"
                          aria-label="Eliminar característica"
                          onClick={() => removeCharacteristicItem(index)}
                          type="button"
                        >
                          <FiTrash2 />
                        </IconButton>
                      )}
                    </HStack>
                  ))}
                </Stack>
              </Box>

              <HStack gap={4}>
                <Box flex="1">
                  <Text fontWeight="medium" mb={2}>
                    Rating (1-5)
                  </Text>
                  <Input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    {...register('rating', {
                      valueAsNumber: true,
                      min: 1,
                      max: 5,
                    })}
                    placeholder="4.5"
                  />
                </Box>

                <Box flex="1">
                  <Text fontWeight="medium" mb={2}>
                    Estado
                  </Text>
                  <select
                    {...register('isActive')}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #E2E8F0',
                      borderRadius: '6px',
                      backgroundColor: 'white',
                    }}
                  >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </Box>
              </HStack>
            </VStack>
          </Box>

          <HStack
            justifyContent="flex-end"
            p={6}
            borderTop="1px solid"
            borderColor="gray.200"
            gap={3}
          >
            <Button variant="outline" onClick={handleClose} type="button">
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Actualizando...' : 'Actualizar Lugar'}
            </Button>
          </HStack>
        </form>
      </Box>
    </Box>
  );
};
