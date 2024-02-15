import Auth from "@/user/pages/layouts/Auth";

const SignUp = () => {
  return (
    <Auth
      cardTitle="Create your account"
      btnText="Create my account!"
      hasUserName={true}
      hasPassConfirmed={true}
      action="user/signup"
    />
  );
};

export default SignUp;
