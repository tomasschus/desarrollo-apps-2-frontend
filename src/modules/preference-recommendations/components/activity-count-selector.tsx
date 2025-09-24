import { RadioGroup, Text, VStack } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import type { FormFieldProps } from '../preference-recommendations.api';

export const ActivityCountSelector = ({ control, errors }: FormFieldProps) => {
  return (
    <VStack gap={2} align="stretch">
      <Text fontSize="sm" fontWeight="medium">
        ¿Cuántas actividades quieres hacer?
      </Text>

      <Controller
        name="activityCount"
        control={control}
        rules={{ required: 'Selecciona cuántas actividades quieres hacer' }}
        render={({ field: { onChange, value } }) => (
          <RadioGroup.Root
            value={value}
            onValueChange={(details) => onChange(details.value)}
          >
            <VStack align="stretch" gap={2}>
              <RadioGroup.Item value="1">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>1 actividad</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="2">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>2 actividades</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="3">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>3 actividades</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="4+">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Más de 3 actividades</RadioGroup.ItemText>
              </RadioGroup.Item>
            </VStack>
          </RadioGroup.Root>
        )}
      />

      {errors.activityCount && (
        <Text fontSize="xs" color="red.500">
          {errors.activityCount.message}
        </Text>
      )}
    </VStack>
  );
};
