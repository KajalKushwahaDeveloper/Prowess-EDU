  import { InputText } from "primereact/inputtext";

  const InputField = ({
    type = "text",   
    input_Lable, 
    input_Lable_For,        
    placeholder,
    value,                     
    onChange,                 
    width ,           
    disabled = false,           
    customClass,         
    keyfilter = null,         
    maxLength,               
    name,                      
    autoComplete = "off"    
  }) => {
    return (
      <div className={`input-container ${customClass}`}>
        <InputText
          type={type}
          label={input_Lable}
          labelfor={input_Lable_For}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width:  width || "100%" ,
            height: "48px",
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
            border: 'none',                               // No border
            outline: 'none',                              // Remove focus border
            padding: '0 10px',                            // Optional padding for better appearance
            backgroundColor: '#fff',                      // Ensure background is white
          }}
          disabled={disabled}
          keyfilter={keyfilter}
          maxLength={maxLength}
          name={name}
          autoComplete={autoComplete}
          className="p-inputtext p-component shadow-none"  // PrimeReact input class without shadow
        />
      </div>
    );
  };

  export default InputField;
