import {
  Button,
  Card,
  Select,
  Stack,
  Text,
  createListCollection,
} from '@chakra-ui/react';
import { useState } from 'react';

interface UserFiltersProps {
  onFilter: (filters: {
    role?: string;
    isActive?: boolean;
    dateFrom?: string;
    dateTo?: string;
  }) => void;
}

export const UserFilters = ({ onFilter }: UserFiltersProps) => {
  const [filters, setFilters] = useState({
    role: '',
    isActive: '',
  });

  const roleOptions = createListCollection({
    items: [
      { label: 'Todos los roles', value: '' },
      { label: 'Administrador', value: 'admin' },
      { label: 'Usuario', value: 'user' },
    ],
  });

  const statusOptions = createListCollection({
    items: [
      { label: 'Todos los estados', value: '' },
      { label: 'Activo', value: 'true' },
      { label: 'Inactivo', value: 'false' },
    ],
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const apiFilters: any = {};
    if (newFilters.role) apiFilters.role = newFilters.role;
    if (newFilters.isActive)
      apiFilters.isActive = newFilters.isActive === 'true';

    onFilter(apiFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = { role: '', isActive: '', dateFrom: '', dateTo: '' };
    setFilters(clearedFilters);
    onFilter({});
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== '');

  return (
    <Card.Root>
      <Card.Body>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          gap={4}
          align={{ base: 'stretch', md: 'center' }}
          justify="space-between"
        >
          <Stack direction={{ base: 'column', sm: 'row' }} gap={4} flex={1}>
            <Stack gap={2} minW="200px">
              <Text fontSize="sm" fontWeight="medium" color="gray.700">
                Rol
              </Text>
              <Select.Root
                size="sm"
                collection={roleOptions}
                value={[filters.role]}
                onValueChange={(details) =>
                  handleFilterChange('role', details.value[0] || '')
                }
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText>
                      {filters.role
                        ? roleOptions.items.find(
                            (item) => item.value === filters.role
                          )?.label
                        : 'Todos los roles'}
                    </Select.ValueText>
                  </Select.Trigger>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    {roleOptions.items.map((item) => (
                      <Select.Item key={item.value} item={item}>
                        <Select.ItemText>{item.label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
            </Stack>

            <Stack gap={2} minW="200px">
              <Text fontSize="sm" fontWeight="medium" color="gray.700">
                Estado
              </Text>
              <Select.Root
                size="sm"
                collection={statusOptions}
                value={[filters.isActive]}
                onValueChange={(details) =>
                  handleFilterChange('isActive', details.value[0] || '')
                }
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText>
                      {filters.isActive
                        ? statusOptions.items.find(
                            (item) => item.value === filters.isActive
                          )?.label
                        : 'Todos los estados'}
                    </Select.ValueText>
                  </Select.Trigger>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    {statusOptions.items.map((item) => (
                      <Select.Item key={item.value} item={item}>
                        <Select.ItemText>{item.label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
            </Stack>

            {hasActiveFilters && (
              <Button
                size="sm"
                variant="ghost"
                colorPalette="gray"
                onClick={handleClearFilters}
                alignSelf={{ base: 'center', sm: 'end' }}
                mt={8}
              >
                Limpiar Filtros
              </Button>
            )}
          </Stack>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};
