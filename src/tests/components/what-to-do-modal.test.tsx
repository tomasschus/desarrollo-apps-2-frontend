import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { WhatToDoModal } from '../../components/what-to-do-modal';

describe('WhatToDoModal', () => {
  const renderWithProviders = (component: React.ReactElement) =>
    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        {component}
      </ChakraProvider>
    );

  it('renders WhatToDoModal when open', () => {
    const mockOnOpenChange = jest.fn();

    renderWithProviders(
      <WhatToDoModal isOpen={true} onOpenChange={mockOnOpenChange} />
    );

    expect(screen.getByText('¿Qué te gustaría hacer?')).toBeInTheDocument();
    expect(
      screen.getByText('Describe la actividad que tienes en mente')
    ).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    const mockOnOpenChange = jest.fn();

    renderWithProviders(
      <WhatToDoModal isOpen={false} onOpenChange={mockOnOpenChange} />
    );

    expect(
      screen.queryByText('¿Qué te gustaría hacer?')
    ).not.toBeInTheDocument();
  });

  it('calls onOpenChange when cancel button is clicked', async () => {
    const mockOnOpenChange = jest.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <WhatToDoModal isOpen={true} onOpenChange={mockOnOpenChange} />
    );

    const cancelButton = screen.getByText('Cancelar');
    await user.click(cancelButton);

    expect(mockOnOpenChange).toHaveBeenCalledTimes(1);
  });

  it('shows error for invalid activity', async () => {
    const mockOnOpenChange = jest.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <WhatToDoModal isOpen={true} onOpenChange={mockOnOpenChange} />
    );

    const activityInput = screen.getByPlaceholderText(
      'Ej: Visitar un museo, ir al teatro...'
    );
    await user.type(activityInput, 'abc');

    // Select required fields
    const activityRadio = screen.getByText('1 actividad');
    await user.click(activityRadio);

    const carRadio = screen.getByText('Sí, tengo auto');
    await user.click(carRadio);

    const submitButton = screen.getByText('Sugerir');
    await user.click(submitButton);

    expect(
      screen.getByText('La descripción debe tener al menos 5 caracteres')
    ).toBeInTheDocument();
  });
});
