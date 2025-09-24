import { RadioGroup, Text, VStack } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import type { FormFieldProps } from '../preference-recommendations.api';

export const CarAvailabilitySelector = ({
  control,
  errors,
}: FormFieldProps) => {
  return (
    <VStack gap={2} align="stretch">
      <Text fontSize="sm" fontWeight="medium">
        ¿Tienes auto disponible?
      </Text>

      <Controller
        name="hasCar"
        control={control}
        rules={{ required: 'Indica si tienes auto disponible' }}
        render={({ field: { onChange, value } }) => (
          <RadioGroup.Root
            value={value}
            onValueChange={(details) => onChange(details.value)}
          >
            <VStack align="stretch" gap={2}>
              <RadioGroup.Item value="si">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Sí, tengo auto</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="no">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>
                  No, usaré transporte público
                </RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="tal-vez">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Tal vez, depende</RadioGroup.ItemText>
              </RadioGroup.Item>
            </VStack>
          </RadioGroup.Root>
        )}
      />

      {errors.hasCar && (
        <Text fontSize="xs" color="red.500">
          {errors.hasCar.message}
        </Text>
      )}
    </VStack>
  );
};
