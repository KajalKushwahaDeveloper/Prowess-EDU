import Login_Logo from "../components/common/login_logo.jsx";
import LoginForm from "../components/organisms/login_form.jsx";

const LoginPage = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full overflow-hidden">
      {/* Left section with the logo */}
      <div className="lg:w-1/2 w-full lg:h-screen h-96">
        <div className="text-center p-4 h-full">
          <Login_Logo />
        </div>
      </div>

      {/* Right section with the login form */}
      <div className="flex items-center justify-center lg:w-1/2 w-full h-full md:mt-4 overflow-hidden">
        <div className="bg-white w-full max-w-md p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
