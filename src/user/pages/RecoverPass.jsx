import Auth from "@/user/pages/layouts/Auth";
import FormDialogBoxMsg from "components/FormDialogBoxMsg";

const RecoverPass = () => {
  return (
    <Auth
      cardTitle="Recover your password"
      btnText="Recover"
      dialogMsg={<FormDialogBoxMsg hasEmail={true} hasPassword={true} />}
      hasPassConfirmed={true}
      method="PATCH"
      action="user/recover-pass"
    />
  );
};

export default RecoverPass;
