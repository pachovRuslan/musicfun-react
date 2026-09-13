import { Routing } from "@/common/routing"
import { Header } from "../common/components"
import s from './App.module.css'
import { ToastContainer } from "react-toastify"
import { useGlobalLoading } from "@/common/hooks/useGlobalLoading"
import { LinearProgress } from "@/common/components/LinearProgress/LinearProgress"
import { Sidebar } from "@/common/components/Sidebar/Sidebar"
import { PlayerBar } from "@/common/components/PlayerBar/PlayerBar"

function App() {
  const isGlobalLoading = useGlobalLoading()
  return (
    <div className={s.appShell}>
      <Sidebar />
      <div className={s.main}>
        <Header />
        {isGlobalLoading && <LinearProgress />}
        <main className={s.content}>
          <Routing />
        </main>
      </div>
      <PlayerBar />
      <ToastContainer />
    </div>
  )
}

export default App