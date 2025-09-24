export const Button = ({ children, ...props }: any) => (
  <button data-testid="chakra-button" {...props}>
    {children}
  </button>
);

export const Box = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
);

export const Container = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
);

export const HStack = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
);

export const VStack = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
);

export const Stack = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
);

export const Text = ({ children, ...props }: any) => (
  <span {...props}>{children}</span>
);

export const Heading = ({ children, ...props }: any) => (
  <h1 {...props}>{children}</h1>
);

export const Image = (props: any) => <img {...props} />;

export const IconButton = ({ children, ...props }: any) => (
  <button data-testid="icon-button" {...props}>
    {children}
  </button>
);

export const Menu = {
  Root: ({ children }: any) => <div data-testid="menu">{children}</div>,
  Trigger: ({ children }: any) => (
    <button data-testid="menu-trigger">{children}</button>
  ),
  Positioner: ({ children }: any) => (
    <div data-testid="menu-positioner">{children}</div>
  ),
  Content: ({ children }: any) => (
    <div data-testid="menu-content">{children}</div>
  ),
  Item: ({ children, onClick, value }: any) => (
    <div data-testid={`menu-item-${value}`} onClick={onClick}>
      {children}
    </div>
  ),
};

export const Dialog = {
  Root: ({ children, open }: any) =>
    open ? <div data-testid="dialog">{children}</div> : null,
  Backdrop: () => <div data-testid="dialog-backdrop" data-part="backdrop" />,
  Positioner: ({ children }: any) => (
    <div data-testid="dialog-positioner">{children}</div>
  ),
  Content: ({ children }: any) => (
    <div data-testid="dialog-content">{children}</div>
  ),
  Header: ({ children }: any) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  Title: ({ children }: any) => <h2 data-testid="dialog-title">{children}</h2>,
  Body: ({ children }: any) => <div data-testid="dialog-body">{children}</div>,
  CloseTrigger: ({ children, onClick }: any) => (
    <button aria-label="Cerrar modal" onClick={onClick}>
      {children}
    </button>
  ),
};

export const Badge = ({ children, ...props }: any) => (
  <span {...props}>{children}</span>
);

export const Flex = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
);

export const Grid = ({ children, ...props }: any) => (
  <div data-testid="grid" {...props}>
    {children}
  </div>
);

export const GridItem = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
);

export const Icon = ({ children, ...props }: any) => (
  <span {...props}>{children}</span>
);

export const ChakraProvider = ({ children }: any) => (
  <div data-testid="chakra-provider">{children}</div>
);

export const ClientOnly = ({ children, fallback }: any) => children || fallback;

export const Skeleton = ({ children, ...props }: any) => (
  <div data-testid="skeleton" {...props}>
    {children}
  </div>
);

export const Span = ({ children, ...props }: any) => (
  <span {...props}>{children}</span>
);

export const Card = {
  Root: ({ children, ...props }: any) => (
    <div data-testid="card-root" {...props}>
      {children}
    </div>
  ),
  Body: ({ children, ...props }: any) => (
    <div data-testid="card-body" {...props}>
      {children}
    </div>
  ),
  Header: ({ children, ...props }: any) => (
    <div data-testid="card-header" {...props}>
      {children}
    </div>
  ),
  Footer: ({ children, ...props }: any) => (
    <div data-testid="card-footer" {...props}>
      {children}
    </div>
  ),
};
