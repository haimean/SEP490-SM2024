import DashboardLayout from "../../../components/layout/dashboard";
import { UserView } from "../../../sections/user/view";

// ----------------------------------------------------------------------

export default function ListAccount() {
  return (
    <>
      <title> User | Minimal UI </title>
      <DashboardLayout>
        <UserView />
      </DashboardLayout>
    </>
  );
}
