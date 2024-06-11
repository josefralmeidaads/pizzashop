import { RouterProvider } from 'react-router-dom';
import { Button } from './components/ui/button';
import { router } from './routes/Router';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import './global.css';
import { ThemeProvider } from './components/Theme';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | pizza.shop"/>
        <Toaster position='top-right' richColors/>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
