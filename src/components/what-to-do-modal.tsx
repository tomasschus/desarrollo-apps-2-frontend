import {
  Button,
  Checkbox,
  Dialog,
  Grid,
  Input,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type WhatToDoFormData = {
  activity: string;
  peopleCount: number;
  date: string;
  hasMinors: boolean;
  activityCount: string;
  hasCar: string;
};

export const WhatToDoModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<WhatToDoFormData>({
    defaultValues: {
      activity: "",
      peopleCount: 1,
      date: "",
      hasMinors: false,
      activityCount: "",
      hasCar: "",
    },
  });

  const onSubmit = async (data: WhatToDoFormData) => {
    // Validar campos requeridos manualmente
    if (!data.activityCount) {
      alert("Por favor selecciona cuántas actividades quieres hacer");
      return;
    }
    if (!data.hasCar) {
      alert("Por favor indica si tienes auto disponible");
      return;
    }

    console.log("Datos del formulario:", data);
    // Aquí iría la lógica para enviar los datos al backend
    // Por ahora solo mostramos en consola

    // Cerrar el modal después de enviar
    onOpenChange();
    reset();
  };

  const handleCancel = () => {
    reset();
    onOpenChange();
  };

  const handleActivityCountChange = (details: any) => {
    setValue("activityCount", details.value);
  };

  const handleHasCarChange = (details: any) => {
    setValue("hasCar", details.value);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxW="500px">
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Dialog.Title>¿Qué te gustaría hacer?</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack gap={6} align="stretch">
                <VStack gap={2} align="stretch">
                  <Text fontSize="sm" color="gray.600" fontWeight="medium">
                    Describe la actividad que tienes en mente
                  </Text>
                  <Input
                    {...register("activity", {
                      required: "Por favor describe la actividad",
                      minLength: {
                        value: 5,
                        message:
                          "La descripción debe tener al menos 5 caracteres",
                      },
                    })}
                    placeholder="Ej: Visitar un museo, ir al teatro..."
                    size="lg"
                    focusRingColor="orange.400"
                    _focus={{
                      borderColor: "orange.400",
                      boxShadow: "0 0 0 1px orange.400",
                    }}
                  />
                  {errors.activity && (
                    <Text fontSize="xs" color="red.500">
                      {errors.activity.message}
                    </Text>
                  )}
                </VStack>

                <Grid templateColumns="1fr 1fr" gap={4}>
                  <VStack gap={2} align="stretch">
                    <Text fontSize="sm" fontWeight="medium">
                      ¿Cuántas personas van?
                    </Text>
                    <Input
                      {...register("peopleCount", {
                        required: "Indica el número de personas",
                        min: {
                          value: 1,
                          message: "Debe ser al menos 1 persona",
                        },
                        max: {
                          value: 20,
                          message: "Máximo 20 personas",
                        },
                        valueAsNumber: true,
                      })}
                      type="number"
                      placeholder="1"
                      min="1"
                      max="20"
                    />
                    {errors.peopleCount && (
                      <Text fontSize="xs" color="red.500">
                        {errors.peopleCount.message}
                      </Text>
                    )}
                  </VStack>

                  <VStack gap={2} align="stretch">
                    <Text fontSize="sm" fontWeight="medium">
                      ¿Qué día?
                    </Text>
                    <Input
                      {...register("date", {
                        required: "Selecciona una fecha",
                      })}
                      type="date"
                    />
                    {errors.date && (
                      <Text fontSize="xs" color="red.500">
                        {errors.date.message}
                      </Text>
                    )}
                  </VStack>
                </Grid>

                <VStack gap={4} align="stretch">
                  <Checkbox.Root colorScheme="orange">
                    <Checkbox.HiddenInput {...register("hasMinors")} />
                    <Checkbox.Control />
                    <Checkbox.Label fontSize="sm">
                      ¿Hay menores de edad?
                    </Checkbox.Label>
                  </Checkbox.Root>

                  <VStack gap={2} align="stretch">
                    <Text fontSize="sm" fontWeight="medium">
                      ¿Cuántas actividades quieres hacer?
                    </Text>
                    <RadioGroup.Root onValueChange={handleActivityCountChange}>
                      <VStack align="stretch" gap={2}>
                        <RadioGroup.Item value="1">
                          <RadioGroup.ItemControl />
                          <RadioGroup.ItemText>1 actividad</RadioGroup.ItemText>
                        </RadioGroup.Item>
                        <RadioGroup.Item value="2">
                          <RadioGroup.ItemControl />
                          <RadioGroup.ItemText>
                            2 actividades
                          </RadioGroup.ItemText>
                        </RadioGroup.Item>
                        <RadioGroup.Item value="3">
                          <RadioGroup.ItemControl />
                          <RadioGroup.ItemText>
                            3 actividades
                          </RadioGroup.ItemText>
                        </RadioGroup.Item>
                        <RadioGroup.Item value="4+">
                          <RadioGroup.ItemControl />
                          <RadioGroup.ItemText>
                            Más de 3 actividades
                          </RadioGroup.ItemText>
                        </RadioGroup.Item>
                      </VStack>
                    </RadioGroup.Root>
                    {errors.activityCount && (
                      <Text fontSize="xs" color="red.500">
                        Selecciona una opción
                      </Text>
                    )}
                  </VStack>

                  <VStack gap={2} align="stretch">
                    <Text fontSize="sm" fontWeight="medium">
                      ¿Tienes auto disponible?
                    </Text>
                    <RadioGroup.Root onValueChange={handleHasCarChange}>
                      <VStack align="stretch" gap={2}>
                        <RadioGroup.Item value="si">
                          <RadioGroup.ItemControl />
                          <RadioGroup.ItemText>
                            Sí, tengo auto
                          </RadioGroup.ItemText>
                        </RadioGroup.Item>
                        <RadioGroup.Item value="no">
                          <RadioGroup.ItemControl />
                          <RadioGroup.ItemText>
                            No, usaré transporte público
                          </RadioGroup.ItemText>
                        </RadioGroup.Item>
                        <RadioGroup.Item value="tal-vez">
                          <RadioGroup.ItemControl />
                          <RadioGroup.ItemText>
                            Tal vez, depende
                          </RadioGroup.ItemText>
                        </RadioGroup.Item>
                      </VStack>
                    </RadioGroup.Root>
                    {errors.hasCar && (
                      <Text fontSize="xs" color="red.500">
                        Selecciona una opción
                      </Text>
                    )}
                  </VStack>
                </VStack>
              </VStack>
            </form>
          </Dialog.Body>
          <Dialog.Footer>
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              colorScheme="orange"
              onClick={handleSubmit(onSubmit)}
              loading={isSubmitting}
            >
              Sugerir
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
