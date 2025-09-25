'use client';

import {
  Box,
  Toaster as ChakraToaster,
  createToaster,
  Flex,
  Portal,
  Spinner,
  Stack,
  Toast,
} from '@chakra-ui/react';

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
});

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster
        toaster={toaster}
        insetInline={{ mdDown: '4' }}
        {...({} as any)}
      >
        {(toast: any) => (
          <Toast.Root width={{ md: 'sm' }}>
            {toast.type === 'loading' ? (
              <Spinner size="sm" color="green.solid" />
            ) : (
              <Toast.Indicator />
            )}

            <Flex direction="column" gap={2} width="100%">
              <Flex align="flex-start" gap={2}>
                <Box flex={1}>
                  <Stack gap="1" flex="1" maxWidth="100%">
                    {toast.title && (
                      <Toast.Title {...({} as any)}>{toast.title}</Toast.Title>
                    )}
                    {toast.description && (
                      <Toast.Description {...({} as any)}>
                        {toast.description}
                      </Toast.Description>
                    )}
                  </Stack>
                </Box>

                {toast.closable && (
                  <Box ml={2}>
                    <Toast.CloseTrigger />
                  </Box>
                )}
              </Flex>

              {toast.action && (
                <Flex justify="flex-end">
                  <Toast.ActionTrigger {...({} as any)}>
                    {toast.action.label}
                  </Toast.ActionTrigger>
                </Flex>
              )}
            </Flex>
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
