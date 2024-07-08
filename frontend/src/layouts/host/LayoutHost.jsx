import Navbar from "../../layouts/player/Navbar";
import Sidebar from "./Sidebar";
import Footer from "../player/Footer";
export default function LayoutHost({ children }) {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5 mb-5">
        <div>
          <div className="">
            <Sidebar />
          </div>
        </div>
        <div className="col-span-4">{children}</div>
      </div>
      <Footer />
    </>
  );
}
