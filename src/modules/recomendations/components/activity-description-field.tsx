import { Input, Text, VStack } from '@chakra-ui/react';
import type { FormFieldProps } from '../recomendation.api';

export const ActivityDescriptionField = ({
  register,
  errors,
}: FormFieldProps) => {
  return (
    <VStack gap={2} align="stretch">
      <Text fontSize="sm" color="gray.600" fontWeight="medium">
        Describe la actividad que tienes en mente
      </Text>
      <Input
        {...register('activity', {
          required: 'Por favor describe la actividad',
          minLength: {
            value: 5,
            message: 'La descripción debe tener al menos 5 caracteres',
          },
        })}
        placeholder="Ej: Visitar un museo, ir al teatro..."
        size="lg"
        focusRingColor="orange.400"
        _focus={{
          borderColor: 'orange.400',
          boxShadow: '0 0 0 1px orange.400',
        }}
      />
      {errors.activity && (
        <Text fontSize="xs" color="red.500">
          {errors.activity.message}
        </Text>
      )}
    </VStack>
  );
};
