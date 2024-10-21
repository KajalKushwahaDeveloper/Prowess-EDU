const Button = ({ label, onClick, width, height, customClass, icon ,backgroundColor}) => {
    return (
      <>
        <div className="flex  items-center justify-center">
        <button
          type="button"
          onClick={onClick}
          style={{
            backgroundColor: backgroundColor || "#004871",   // Default background color
            color: "#fff",                  // Default text color
            width: width ,         // Default width
            height: height || "auto",       // Default height
            border: 'none',                 // No border
            outline: 'none',                // No outline on click
            borderRadius: '6px',            // Border radius of 6px
            padding: '10px 20px',           // Optional padding for button
          }}
          className={`font-medium ${customClass} hover:opacity-90`} // Allows passing custom classes if needed
        >
          {icon && <i className={`pi ${icon} mr-2`}></i>} 
          {label}
        </button>
        </div>
      </>
    );
  };
  
  export default Button;
  