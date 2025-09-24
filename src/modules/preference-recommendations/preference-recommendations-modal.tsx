import { Button, Dialog } from '@chakra-ui/react';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { RecomendationForm } from './components/recomendation-form';
import type { RecomendationModalData } from './preference-recommendations.api';

export const RecomendationModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const formId = useId();
  const navigate = useNavigate();
  const form = useForm<RecomendationModalData>({
    defaultValues: {
      activity: '',
      peopleCount: 1,
      date: '',
      hasMinors: false,
      activityCount: '1',
      hasCar: 'si',
    },
  });

  const onSubmit = async (data: RecomendationModalData) => {
    const params = new URLSearchParams();
    params.append('category', data.activity);
    params.append('peopleQuantity', data.peopleCount.toString());
    params.append('placesQuantity', data.activityCount);
    params.append('hasCar', (data.hasCar === 'si').toString());
    params.append('eventDate', data.date);

    navigate(`/recomendaciones-con-preferencias?${params.toString()}`);
    onOpenChange();
    form.reset();
  };

  const handleCancel = () => {
    onOpenChange();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxW="500px">
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Dialog.Title>¿Qué te gustaría hacer?</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <RecomendationForm form={form} formId={formId} />
          </Dialog.Body>
          <Dialog.Footer>
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button colorPalette="orange" onClick={form.handleSubmit(onSubmit)}>
              Sugerir
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
