import Auth from "@/user/pages/layouts/Auth";
import FormDialogBoxMsg from "components/FormDialogBoxMsg";

const SignUp = () => {
  return (
    <Auth
      cardTitle="Create your account"
      dialogMsg={
        <FormDialogBoxMsg
          hasEmail={true}
          hasUserName={true}
          hasPassword={true}
        />
      }
      btnText="Create my account!"
      hasUserName={true}
      hasPassConfirmed={true}
      action="user/signup"
    />
  );
};

export default SignUp;
