import { UserView } from "../../../sections/admin/user/view";
import DashboardLayout from "../../../layouts/admin/dashboard";
// ----------------------------------------------------------------------

export default function ListAccount() {
  return (
    <DashboardLayout>
      <UserView />
    </DashboardLayout>
  );
}
