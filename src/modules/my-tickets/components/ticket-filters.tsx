import { Button, Flex } from "@chakra-ui/react";

interface TicketFiltersProps {
  activeFilter: "all" | "active" | "used" | "cancelled";
  onFilterChange: (filter: "all" | "active" | "used" | "cancelled") => void;
  totalTickets: number;
  activeTickets: number;
  usedTickets: number;
  cancelledTickets: number;
}

export const TicketFilters = ({
  activeFilter,
  onFilterChange,
  totalTickets,
  activeTickets,
  usedTickets,
  cancelledTickets,
}: TicketFiltersProps) => {
  return (
    <Flex gap={2} flexWrap="wrap" justify="center">
      <Button
        variant={activeFilter === "all" ? "solid" : "outline"}
        colorScheme="brand"
        size="sm"
        onClick={() => onFilterChange("all")}
      >
        Todos ({totalTickets})
      </Button>
      <Button
        variant={activeFilter === "active" ? "solid" : "outline"}
        colorScheme="green"
        size="sm"
        onClick={() => onFilterChange("active")}
      >
        Activos ({activeTickets})
      </Button>
      <Button
        variant={activeFilter === "used" ? "solid" : "outline"}
        colorScheme="gray"
        size="sm"
        onClick={() => onFilterChange("used")}
      >
        Usados ({usedTickets})
      </Button>
      <Button
        variant={activeFilter === "cancelled" ? "solid" : "outline"}
        colorScheme="red"
        size="sm"
        onClick={() => onFilterChange("cancelled")}
      >
        Cancelados ({cancelledTickets})
      </Button>
    </Flex>
  );
};
