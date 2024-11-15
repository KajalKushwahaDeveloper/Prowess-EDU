import Login_Logo from "../../components/common/login_logo.jsx";
import LoginForm from "../../components/organisms/login_form.jsx";

const ParentLogin = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full overflow-hidden login_screen">
      {/* Left section with the logo */}
      <div className="login_logo lg:w-1/2 w-full lg:h-screen h-96">
        <div className="text-center p-8 h-full">
          <Login_Logo />
        </div>
      </div>

      {/* Right section with the login form */}
      <div className="flex items-center justify-center lg:w-1/2 w-full login-form mt-0 md:mt-1 overflow-hidden">
      <div className="bg-white w-full max-w-lg px-6 md:p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default ParentLogin;
