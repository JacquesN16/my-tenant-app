import './App.css'
import {ThemeProvider} from "./theme-provider.tsx";
import ProfileList from "./app/01_ProfileList.tsx";
import {Toaster} from "./components/ui/toaster.tsx";



function App() {

  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ProfileList />
          <Toaster />
      </ThemeProvider>
  )
}

export default App
