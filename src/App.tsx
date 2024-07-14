import './App.css'
import {ThemeProvider} from "./theme-provider.tsx";
import ProfileList from "./app/01_ProfileList.tsx";




function App() {

  return (
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ProfileList />
      </ThemeProvider>
  )
}

export default App
