import { Stack } from '@chakra-ui/react';
import { Suspense, type ComponentType } from 'react';
import { LoadingIndicator } from './ui/loading-indicator';

interface LazyPageProps {
  Component: ComponentType;
}

const PageLoader = () => (
  <Stack align="center" justify="center" minH="400px">
    <LoadingIndicator />
  </Stack>
);

export const LazyPage = ({ Component }: LazyPageProps) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);
