import './App.css'
import {ThemeProvider} from "./theme-provider.tsx";
import ProfileList from "./app/01_ProfileList.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient()

function App() {

  return (
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <QueryClientProvider client={queryClient}>
            <ProfileList />
          </QueryClientProvider>
      </ThemeProvider>
  )
}

export default App
