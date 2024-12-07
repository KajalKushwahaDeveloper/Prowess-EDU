const Button = ({ label, onClick, width, height, customClass, icon, backgroundColor, iconColor, border }) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={onClick}
          style={{
            backgroundColor: backgroundColor || "#004871",   // Default background color
            color: "#fff",                  // Default text color
            width: width,         // Default width
            height: height || "auto",       // Default height
            border: 'none',                 // No border
            outline: 'none',                // No outline on click
            borderRadius: '6px',            // Border radius of 6px
            padding: '10px 10px',
          }}
          className={`font-medium ${customClass} flex items-center justify-center hover:opacity-90`} // Applied flex here
        >
          <div className="flex items-center justify-center gap-2 ml-3  ">
            <span >{icon && <i className={`pi ${icon}`}  style={{ color: iconColor || "#FFFFFF", fontSize:"1rem" }}></i>} </span>
            <span className="text-lg">{label}</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default Button;
