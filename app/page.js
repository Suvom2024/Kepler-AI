import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import Content from "@/components/content"
import { ToastContainer } from "react-toastify"

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <Sidebar />
      <Content />
      <ToastContainer />
    </div>
  )
}
