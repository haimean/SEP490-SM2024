import Navbar from "../../../layouts/player/Navbar";
import Footer from "../../../layouts/player/Footer";
import BranchListComponent from "../../../components/host/branch/BranchListComponent";
export default function BranchList() {
  return (
    <>
      <Navbar />
      <BranchListComponent />
      <Footer />
    </>
  );
}
