import { Card, Grid, Stat } from '@chakra-ui/react';
import type { UserStats } from '../users.api';

interface UserStatsCardsProps {
  stats: UserStats;
}

export const UserStatsCards = ({ stats }: UserStatsCardsProps) => {
  const statsArray = [
    {
      label: 'Total de Usuarios',
      value: stats.totalUsers,
      color: 'blue.600',
    },
    {
      label: 'Usuarios Activos',
      value: stats.activeUsers,
      color: 'green.600',
    },
    {
      label: 'Usuarios Inactivos',
      value: stats.inactiveUsers,
      color: 'red.600',
    },
    {
      label: 'Administradores',
      value: stats.adminUsers,
      color: 'purple.600',
    },
    {
      label: 'Usuarios Regulares',
      value: stats.regularUsers,
      color: 'orange.600',
    },
  ];

  return (
    <Grid
      templateColumns={{
        base: '1fr',
        sm: 'repeat(2, 1fr)',
        lg: 'repeat(5, 1fr)',
      }}
      gap={4}
    >
      {statsArray.map((stat, index) => (
        <Card.Root key={index}>
          <Card.Body>
            <Stat.Root alignItems={'center'}>
              <Stat.ValueText color={stat.color} textAlign={'center'}>
                {stat.value}
              </Stat.ValueText>
              <Stat.Label fontWeight={'semibold'} textAlign={'center'}>
                {stat.label}
              </Stat.Label>
            </Stat.Root>
          </Card.Body>
        </Card.Root>
      ))}
    </Grid>
  );
};
