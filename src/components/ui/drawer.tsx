import { Drawer as ChakraDrawer } from "@chakra-ui/react"
import * as React from "react"

export interface DrawerProps extends ChakraDrawer.RootProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
}

export const DrawerRoot = React.forwardRef<HTMLDivElement, DrawerProps>(
  function DrawerRoot(props) {
    const { children, portalled = true, portalRef, ...rest } = props

    return (
      <ChakraDrawer.Root {...rest}>
        {children}
      </ChakraDrawer.Root>
    )
  },
)

export const DrawerBackdrop = ChakraDrawer.Backdrop
export const DrawerTrigger = ChakraDrawer.Trigger
export const DrawerPositioner = ChakraDrawer.Positioner
export const DrawerContent = ChakraDrawer.Content
export const DrawerCloseTrigger = ChakraDrawer.CloseTrigger
export const DrawerHeader = ChakraDrawer.Header
export const DrawerTitle = ChakraDrawer.Title
export const DrawerBody = ChakraDrawer.Body
export const DrawerFooter = ChakraDrawer.Footer

export const Drawer = {
  Root: DrawerRoot,
  Backdrop: DrawerBackdrop,
  Trigger: DrawerTrigger,
  Positioner: DrawerPositioner,
  Content: DrawerContent,
  CloseTrigger: DrawerCloseTrigger,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Body: DrawerBody,
  Footer: DrawerFooter,
}
