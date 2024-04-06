import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import Content from "@/components/content"
import { ToastContainer } from "react-toastify"
import { CheckboxProvider } from '../hooks/CheckboxProvider';

export default function Home() {
  return (
    <CheckboxProvider> {/* Add CheckboxProvider here */}
      <div className="relative">
        <Header />
        <Sidebar />
        <Content />
        <ToastContainer />
      </div>
    </CheckboxProvider>
  );
}
