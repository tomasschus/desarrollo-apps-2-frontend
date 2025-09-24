import { Grid, Input, Text, VStack } from '@chakra-ui/react';
import type { FormFieldProps } from '../preference-recommendations.api';

export const PeopleAndDateFields = ({ register, errors }: FormFieldProps) => {
  return (
    <Grid templateColumns="1fr 1fr" gap={4}>
      <VStack gap={2} align="stretch">
        <Text fontSize="sm" fontWeight="medium">
          ¿Cuántas personas van?
        </Text>
        <Input
          {...register('peopleCount', {
            required: 'Indica el número de personas',
            min: {
              value: 1,
              message: 'Debe ser al menos 1 persona',
            },
            max: {
              value: 20,
              message: 'Máximo 20 personas',
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
          {...register('date', {
            required: 'Selecciona una fecha',
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
  );
};
