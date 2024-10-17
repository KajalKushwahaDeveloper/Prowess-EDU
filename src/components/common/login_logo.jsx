import logo from "../../assets/images/logo.png";
import bg_img from "../../assets/images/splash-bg.png";

const Login_Logo = () => {
  return (
    <div className="relative rounded-lg bg_color h-full">
      <img
        src={bg_img}
        alt="School bg_image"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center justify-center flex-col text-center">
          <img src={logo} className="w-32 h-32 mb-5" alt="School Logo" />
          <h1 className="text-white text-4xl font-semibold">Prowess Education</h1>
        </div>
      </div>
    </div>
  );
};

export default Login_Logo;
