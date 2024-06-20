import './App.css'
import { ParamsSimulatePage } from './pages/simulation/ParamsSimulatePage'
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
       <ParamsSimulatePage />
    </ThemeProvider>
  )
}

export default App
