import Auth from "@/user/pages/layouts/Auth";

const SignIn = () => {
  return (
    <Auth
      cardTitle="Enter your account"
      btnText="Login"
      btnBackHref={"/"}
      isSignIn={true}
      action="user/signin"
      redirectPath="/trend-tide"
    />
  );
};

export default SignIn;
