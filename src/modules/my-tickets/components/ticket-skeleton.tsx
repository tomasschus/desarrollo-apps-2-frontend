import { Card, Flex, Skeleton, VStack } from "@chakra-ui/react";

export const TicketSkeleton = () => (
  <Card.Root>
    <Skeleton height="200px" />
    <Card.Body>
      <VStack align="stretch" gap={3}>
        <Skeleton height="20px" />
        <Skeleton height="16px" />
        <Skeleton height="16px" width="70%" />
        <Flex justify="space-between">
          <Skeleton height="16px" width="40%" />
          <Skeleton height="16px" width="30%" />
        </Flex>
      </VStack>
    </Card.Body>
  </Card.Root>
);
