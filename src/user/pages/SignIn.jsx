import Auth from "@/user/pages/layouts/Auth";
import FormDialogBoxMsg from "components/FormDialogBoxMsg";

const SignIn = () => {
  return (
    <Auth
      cardTitle="Enter your account"
      dialogMsg={<FormDialogBoxMsg hasEmail={true} hasPassword={true} />}
      btnText="Login"
      btnBackHref={"/"}
      isSignIn={true}
      action="user/signin"
      redirectPath="/trend-tide"
    />
  );
};

export default SignIn;
