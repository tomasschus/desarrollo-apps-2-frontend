import { render, screen } from '@testing-library/react';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import {
  DrawerRoot,
  DrawerBackdrop,
  DrawerTrigger,
  DrawerPositioner,
  DrawerContent,
  DrawerCloseTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
  Drawer,
} from '../../../components/ui/drawer';

describe('Drawer', () => {
  const renderWithProviders = (component: React.ReactElement) =>
    render(
      <ChakraProvider value={createSystem(defaultConfig)}>
        {component}
      </ChakraProvider>
    );

  describe('DrawerRoot', () => {
    it('renders children', () => {
      renderWithProviders(
        <DrawerRoot>
          <div>Test Child</div>
        </DrawerRoot>
      );

      expect(screen.getByText('Test Child')).toBeInTheDocument();
    });
  });

  describe('Drawer components', () => {
    it('Drawer object has all components', () => {
      expect(Drawer.Root).toBe(DrawerRoot);
      expect(Drawer.Backdrop).toBe(DrawerBackdrop);
      expect(Drawer.Trigger).toBe(DrawerTrigger);
      expect(Drawer.Positioner).toBe(DrawerPositioner);
      expect(Drawer.Content).toBe(DrawerContent);
      expect(Drawer.CloseTrigger).toBe(DrawerCloseTrigger);
      expect(Drawer.Header).toBe(DrawerHeader);
      expect(Drawer.Title).toBe(DrawerTitle);
      expect(Drawer.Body).toBe(DrawerBody);
      expect(Drawer.Footer).toBe(DrawerFooter);
    });
  });
});
