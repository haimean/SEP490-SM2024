import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutPlayer({ children }) {
  return (
    <>
      <Navbar sx={{ flexShrink: 0 }} />
      {children}
      <Footer sx={{ flexShrink: 0 }} />
    </>
  );
}
