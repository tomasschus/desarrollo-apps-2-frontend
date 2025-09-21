import { Button, HStack, Input, Stack } from '@chakra-ui/react';
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
    <Stack
      direction={{ base: 'column', md: 'row' }}
      gap={4}
      align="center"
      justify="space-between"
    >
      <HStack gap={3} wrap="wrap">
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          style={{
            padding: '6px 12px',
            border: '1px solid #E2E8F0',
            borderRadius: '6px',
            backgroundColor: 'white',
            fontSize: '14px',
            minWidth: '150px',
          }}
        >
          <option value="">Filtrar por estado</option>
          <option value="active">Activos</option>
          <option value="used">Utilizados</option>
          <option value="cancelled">Cancelados</option>
          <option value="refunded">Reembolsados</option>
        </select>

        <Input
          type="date"
          placeholder="Desde"
          size="sm"
          maxW="150px"
          value={filters.dateFrom}
          onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
          bg="white"
          borderColor="gray.200"
        />

        <Input
          type="date"
          placeholder="Hasta"
          size="sm"
          maxW="150px"
          value={filters.dateTo}
          onChange={(e) => handleFilterChange('dateTo', e.target.value)}
          bg="white"
          borderColor="gray.200"
        />

        {hasActiveFilters && (
          <Button
            size="sm"
            variant="ghost"
            colorPalette="gray"
            onClick={handleClearFilters}
          >
            Limpiar Filtros
          </Button>
        )}
      </HStack>

      <HStack gap={2}>
        <Button
          colorPalette="green"
          variant="outline"
          size="sm"
          onClick={onExport}
          disabled={loading}
        >
          Exportar Reporte
        </Button>
      </HStack>
    </Stack>
  );
};
