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
} from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { useGetDataFromBackend } from "../../../../hooks/useGetDataFromBackend";
import { getCulturalPlaces, getEvents } from "../../api/admin.api";

interface CulturalPlace {
  _id: string;
  name: string;
  description: string;
  image: string;
}

interface TicketType {
  type: string;
  price: number;
  initialQuantity: number;
  soldQuantity: number;
  isActive: boolean;
}

interface EventFormData {
  culturalPlaceId: string;
  name: string;
  description: string;
  date: string;
  time: string;
  isActive: boolean;
  ticketTypes: TicketType[];
}

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated: () => void;
}

export const CreateEventModal = ({
  isOpen,
  onClose,
  onEventCreated,
}: CreateEventModalProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<EventFormData>({
    defaultValues: {
      culturalPlaceId: "",
      name: "",
      description: "",
      date: "",
      time: "",
      isActive: true,
      ticketTypes: [
        {
          type: "general",
          price: 0,
          initialQuantity: 0,
          soldQuantity: 0,
          isActive: true,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ticketTypes",
  });

  const { data: culturalPlaces, loading: loadingPlaces } =
    useGetDataFromBackend<CulturalPlace[]>({
      url: getCulturalPlaces(),
      options: { method: "GET" },
      executeAutomatically: true,
    });

  const addTicketType = () => {
    append({
      type: "",
      price: 0,
      initialQuantity: 0,
      soldQuantity: 0,
      isActive: true,
    });
  };

  const removeTicketType = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = async (data: EventFormData) => {
    try {
      const response = await fetch(getEvents(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert("Evento creado correctamente");
        onEventCreated();
        handleClose();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el evento");
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error desconocido");
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

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
        maxW="600px"
        w="full"
        maxH="90vh"
        overflow="auto"
      >
        {/* Header */}
        <HStack
          justifyContent="space-between"
          p={6}
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Text fontSize="xl" fontWeight="bold">
            Crear Nuevo Evento
          </Text>
          <IconButton aria-label="Cerrar" variant="ghost" onClick={handleClose}>
            <FiX />
          </IconButton>
        </HStack>

        {/* Body */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box p={6}>
            <VStack gap={6} align="stretch">
              {/* Lugar Cultural */}
              <Box>
                <Text fontWeight="medium" mb={2}>
                  Lugar Cultural *
                </Text>
                <select
                  {...register("culturalPlaceId", { required: true })}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #E2E8F0",
                    borderRadius: "6px",
                    backgroundColor: "white",
                  }}
                  disabled={loadingPlaces}
                >
                  <option value="">Selecciona un lugar cultural</option>
                  {culturalPlaces?.map((place) => (
                    <option key={place._id} value={place._id}>
                      {place.name}
                    </option>
                  ))}
                </select>
              </Box>

              {/* Nombre del evento */}
              <Box>
                <Text fontWeight="medium" mb={2}>
                  Nombre del Evento *
                </Text>
                <Input
                  {...register("name", { required: true })}
                  placeholder="Ej: Concierto de Jazz"
                />
              </Box>

              {/* Descripción */}
              <Box>
                <Text fontWeight="medium" mb={2}>
                  Descripción
                </Text>
                <Textarea
                  {...register("description")}
                  placeholder="Descripción del evento..."
                  rows={3}
                />
              </Box>

              {/* Fecha y Hora */}
              <HStack gap={4}>
                <Box flex="1">
                  <Text fontWeight="medium" mb={2}>
                    Fecha *
                  </Text>
                  <Input
                    type="date"
                    {...register("date", { required: true })}
                  />
                </Box>

                <Box flex="1">
                  <Text fontWeight="medium" mb={2}>
                    Hora *
                  </Text>
                  <Input
                    type="time"
                    {...register("time", { required: true })}
                  />
                </Box>
              </HStack>

              {/* Tipos de Entrada */}
              <Box>
                <HStack justifyContent="space-between" mb={3}>
                  <Text fontWeight="medium">Tipos de Entrada</Text>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                    onClick={addTicketType}
                    type="button"
                  >
                    <FiPlus style={{ marginRight: "4px" }} />
                    Agregar Tipo
                  </Button>
                </HStack>

                <Stack gap={4}>
                  {fields.map((field, index) => (
                    <Box
                      key={field.id}
                      p={4}
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="md"
                    >
                      <HStack justifyContent="space-between" mb={3}>
                        <Text fontSize="sm" fontWeight="medium">
                          Tipo de Entrada #{index + 1}
                        </Text>
                        {fields.length > 1 && (
                          <IconButton
                            size="sm"
                            colorScheme="red"
                            variant="outline"
                            aria-label="Eliminar tipo"
                            onClick={() => removeTicketType(index)}
                            type="button"
                          >
                            <FiTrash2 />
                          </IconButton>
                        )}
                      </HStack>

                      <Stack gap={3}>
                        <Box>
                          <Text fontSize="sm" fontWeight="medium" mb={1}>
                            Tipo
                          </Text>
                          <select
                            {...register(`ticketTypes.${index}.type`, {
                              required: true,
                            })}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              border: "1px solid #E2E8F0",
                              borderRadius: "6px",
                              backgroundColor: "white",
                            }}
                          >
                            <option value="">Seleccionar tipo</option>
                            <option value="general">General</option>
                            <option value="vip">VIP</option>
                            <option value="jubilados">Jubilados</option>
                            <option value="estudiantes">Estudiantes</option>
                          </select>
                        </Box>

                        <HStack gap={2}>
                          <Box flex="1">
                            <Text fontSize="sm" fontWeight="medium" mb={1}>
                              Precio ($)
                            </Text>
                            <Input
                              type="number"
                              {...register(`ticketTypes.${index}.price`, {
                                required: true,
                                min: 1,
                                valueAsNumber: true,
                              })}
                              min="0"
                            />
                          </Box>

                          <Box flex="1">
                            <Text fontSize="sm" fontWeight="medium" mb={1}>
                              Cantidad
                            </Text>
                            <Input
                              type="number"
                              {...register(
                                `ticketTypes.${index}.initialQuantity`,
                                {
                                  required: true,
                                  min: 1,
                                  valueAsNumber: true,
                                }
                              )}
                              min="1"
                            />
                          </Box>
                        </HStack>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </VStack>
          </Box>

          {/* Footer */}
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
              {isSubmitting ? "Creando..." : "Crear Evento"}
            </Button>
          </HStack>
        </form>
      </Box>
    </Box>
  );
};
