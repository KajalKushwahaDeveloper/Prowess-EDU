const ButtonText = ({ label, onClick, width, height, customClass, icon, backgroundColor, iconColor }) => {
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
              padding: '10px 15px',
            }}
            className={`font-medium ${customClass} flex items-center justify-center hover:opacity-90`} // Applied flex here
          >
            <div className="flex items-center justify-center">
              <span className="text-lg">{label}</span>
            </div>
          </button>
        </div>
      </>
    );
  };
  
  export default ButtonText;
  