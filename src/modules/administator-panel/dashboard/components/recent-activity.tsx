import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import type { DashboardStats } from '../dashboard.utils';

export const RecentActivity = ({
  recentActivity,
}: {
  recentActivity: DashboardStats['recentActivity'];
}) => {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
      shadow="sm"
    >
      <Stack gap={4}>
        <Heading size="md">Actividad Reciente</Heading>
        {recentActivity.map((activity) => (
          <Box
            key={activity.id}
            p={3}
            bg="gray.50"
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
          >
            <Text fontSize="sm" fontWeight="medium">
              {activity.description}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {activity.timestamp}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
