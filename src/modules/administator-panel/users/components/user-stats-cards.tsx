import { Card, Grid, Stat } from '@chakra-ui/react';
import type { UserStats } from '../users-management.api';

interface UserStatsCardsProps {
  stats: UserStats;
}

export const UserStatsCards = ({ stats }: UserStatsCardsProps) => {
  return (
    <Grid
      templateColumns={{
        base: '1fr',
        sm: 'repeat(2, 1fr)',
        lg: 'repeat(5, 1fr)',
      }}
      gap={4}
    >
      <Card.Root>
        <Card.Body>
          <Stat.Root>
            <Stat.Label>Total de Usuarios</Stat.Label>
            <Stat.ValueText color="blue.600">{stats.totalUsers}</Stat.ValueText>
          </Stat.Root>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Body>
          <Stat.Root>
            <Stat.Label>Usuarios Activos</Stat.Label>
            <Stat.ValueText color="green.600">
              {stats.activeUsers}
            </Stat.ValueText>
          </Stat.Root>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Body>
          <Stat.Root>
            <Stat.Label>Usuarios Inactivos</Stat.Label>
            <Stat.ValueText color="red.600">
              {stats.inactiveUsers}
            </Stat.ValueText>
          </Stat.Root>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Body>
          <Stat.Root>
            <Stat.Label>Administradores</Stat.Label>
            <Stat.ValueText color="purple.600">
              {stats.adminUsers}
            </Stat.ValueText>
          </Stat.Root>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Body>
          <Stat.Root>
            <Stat.Label>Usuarios Regulares</Stat.Label>
            <Stat.ValueText color="orange.600">
              {stats.regularUsers}
            </Stat.ValueText>
          </Stat.Root>
        </Card.Body>
      </Card.Root>
    </Grid>
  );
};
