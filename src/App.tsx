import { RouterProvider } from 'react-router';
import { Toaster } from './core/components/ui/toaster';
import { router } from './routes';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
