import Auth from "@/user/pages/layouts/Auth";

const RecoverPass = () => {
  return (
    <Auth
      cardTitle="Recover your password"
      btnText="Recover"
      hasPassConfirmed={true}
      method="PATCH"
      action="user/recover-pass"
    />
  );
};

export default RecoverPass;
