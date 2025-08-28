import { Card, Grid, Stack, Text } from "@chakra-ui/react";

const culturalSpacesMock = [
  {
    name: "Museos",
    description:
      "Espacios dedicados a la exhibición de obras de arte y cultura.",
  },
  {
    name: "Centro cultural recoleta",
    description:
      "Espacios dedicados a la exhibición de obras de arte y cultura.",
  },
  {
    name: "Usina del Arte",
    description:
      "Centro cultural multidisciplinario, declarado Patrimonio histórico de la Ciudad.",
  },
  {
    name: "Teatro Colón",
    description: "Uno de los teatros más importantes del mundo.",
  },
  {
    name: "Estudio Urbano",
    description:
      "Capacitación en oficios vinculados con la música y herramientas de gestión para proyectos artísticos.",
  },
];

export const CulturalSpaces = () => {
  return (
    <Stack>
      <Text>Espacios culturales en la ciudad</Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {culturalSpacesMock.map((space) => (
          <Grid key={space.name}>
            <Card.Root>
              <Card.Body>
                <Text fontWeight="bold">{space.name}</Text>
                <Text>{space.description}</Text>
              </Card.Body>
            </Card.Root>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
