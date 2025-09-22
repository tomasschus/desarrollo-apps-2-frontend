import {
  Button,
  Card,
  Input,
  Select,
  Stack,
  createListCollection,
} from '@chakra-ui/react';
import { useState } from 'react';

interface TicketFiltersProps {
  onFilter: (filters: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => void;
  onExport: () => void;
  loading?: boolean;
}

export const TicketFilters = ({
  onFilter,
  onExport,
  loading = false,
}: TicketFiltersProps) => {
  const [filters, setFilters] = useState({
    status: '',
    dateFrom: '',
    dateTo: '',
  });

  const statusOptions = createListCollection({
    items: [
      { label: 'Todos los estados', value: '' },
      { label: 'Activos', value: 'active' },
      { label: 'Utilizados', value: 'used' },
      { label: 'Cancelados', value: 'cancelled' },
      { label: 'Reembolsados', value: 'refunded' },
    ],
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = { status: '', dateFrom: '', dateTo: '' };
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
          align="center"
          justify="space-between"
        >
          <Stack direction={{ base: 'column', sm: 'row' }} gap={3}>
            <Select.Root
              size="sm"
              collection={statusOptions}
              value={[filters.status]}
              onValueChange={(details) =>
                handleFilterChange('status', details.value[0] || '')
              }
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Todos los estados" />
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

            <Input
              type="date"
              placeholder="Desde"
              size="sm"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              bg="white"
              borderColor="gray.200"
              maxW="140px"
            />

            <Input
              type="date"
              placeholder="Hasta"
              size="sm"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              bg="white"
              borderColor="gray.200"
              maxW="140px"
            />

            {hasActiveFilters && (
              <Button
                size="sm"
                variant="ghost"
                colorPalette="gray"
                onClick={handleClearFilters}
              >
                Limpiar
              </Button>
            )}
          </Stack>

          <Button
            colorPalette="green"
            variant="outline"
            size="sm"
            onClick={onExport}
            disabled={loading}
          >
            Exportar Reporte
          </Button>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};
