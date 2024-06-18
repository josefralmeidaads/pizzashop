import { RouterProvider } from 'react-router-dom';
import { Button } from './components/ui/button';
import { router } from './routes/Router';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import './global.css';
import { ThemeProvider } from './components/Theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | pizza.shop"/>
        <Toaster position='top-right' richColors/>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
        </QueryClientProvider>  
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
