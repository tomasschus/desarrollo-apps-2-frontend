import { Checkbox, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import type { RecomendationModalData } from '../recomendation.api';
import { ActivityCountSelector } from './activity-count-selector';
import { ActivityDescriptionField } from './activity-description-field';
import { CarAvailabilitySelector } from './car-availability-selector';
import { PeopleAndDateFields } from './people-and-date-fields';

interface RecomendationFormProps {
  form: ReturnType<typeof useForm<RecomendationModalData>>;
  formId: string;
}

export const RecomendationForm = ({ form, formId }: RecomendationFormProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <form id={formId}>
      <VStack gap={6} align="stretch">
        <ActivityDescriptionField {...{ control, register, errors }} />

        <PeopleAndDateFields {...{ control, register, errors }} />

        <VStack gap={4} align="stretch">
          <Checkbox.Root colorPalette="orange">
            <Checkbox.HiddenInput {...register('hasMinors')} />
            <Checkbox.Control />
            <Checkbox.Label fontSize="sm">¿Hay menores de edad?</Checkbox.Label>
          </Checkbox.Root>

          <ActivityCountSelector {...{ control, register, errors }} />

          <CarAvailabilitySelector {...{ control, register, errors }} />
        </VStack>
      </VStack>
    </form>
  );
};
