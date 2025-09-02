import { Box, Grid, Stack, VStack } from "@chakra-ui/react";
import { Navigate, useParams } from "react-router";
import { MuseumDetailAbout } from "./museum-detail-about";
import { MuseumDetailContact } from "./museum-detail-contact";
import { MuseumDetailFeatures } from "./museum-detail-features";
import { MuseumDetailHeader } from "./museum-detail-header";
import { MuseumDetailHours } from "./museum-detail-hours";
import { MuseumDetailTickets } from "./museum-detail-tickets";
import { museumDetailMock } from "./museum-detail.mock";

export const MuseumDetail = () => {
  const { id } = useParams<{ id: string }>();
  const museum = museumDetailMock.find((m) => m.id === id);

  if (!museum) {
    return <Navigate to="/" />;
  }

  return (
    <Stack bg="gray.100" pb={6}>
      <MuseumDetailHeader museum={museum} />

      <Box mx="auto" px={4} position="relative">
        <Grid templateColumns={{ base: "1fr", xl: "2fr 1fr" }} gap={6}>
          <VStack gap={2} align="stretch">
            <MuseumDetailAbout longDescription={museum.longDescription} />
            <MuseumDetailFeatures features={museum.features} />
            <MuseumDetailHours openingHours={museum.openingHours} />
          </VStack>

          <VStack gap={2} align="stretch">
            <MuseumDetailContact
              address={museum.address}
              phone={museum.phone}
              website={museum.website}
            />
            <MuseumDetailTickets ticketPrices={museum.ticketPrices} />
          </VStack>
        </Grid>
      </Box>
    </Stack>
  );
};
