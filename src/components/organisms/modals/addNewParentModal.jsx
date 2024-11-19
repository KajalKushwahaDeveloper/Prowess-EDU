import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { addParentSchema } from "../../common/validationSchema"; 
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../features/dashboardSharedApi/sharedReducer";

function AddNewParentModal({ visible, setVisible }) {
  const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
  gender: "",
  childName: "",
  childClass: "",
  childSection: "",
  address: ""
  });

  const [errors, setErrors] = useState({});
  console.log("teachererr:", errors);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = async () => {
    try {
      // Dispatch the addItem action with role and payload
      await addParentSchema.validate(formData, { abortEarly: false });
      console.log("Teacher Data: ", formData);
      await dispatch(addItem({ role: "teacher", payload: formData })).unwrap();
      // Validate the form data
      setErrors({}); // Clear previous errors if validation passes
      setVisible(false); // Optionally close the modal on success
    } catch (error) {
      const formattedErrors = {};
      error?.inner?.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      console.log("Validation errors:", formattedErrors); // For debugging
      setErrors(formattedErrors);
      console.log("Validation or API errors:", error);
    }
  };
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      style={{ width: "50vw", maxWidth: "700px" }}
      onHide={() => setVisible(false)}
      className="rounded-lg"
    >
      <div className="bg-white">
        <h1 className="font-medium text-2xl my-2">Add New Parent</h1>
        <hr className="mb-8 border-gray-300" />

        {/* Form fields */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:p-4">
          <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Name"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.name}</p>
            )}
          </div>

          <div className="relative">
            <InputFieldWithLabel
              type="number"
              labelText="Phone"
              name="phone"
              placeholder="Enter Phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && (
              <p className="text-rose-600 text-md absolute left-0 " style={{ bottom: '-22px' }}>{errors.phone}</p>
            )}
          </div>

          <div className="relative">
            <InputFieldWithLabel
              type="email"
              labelText="Email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-rose-600 text-md absolute left-0 " style={{ bottom: '-22px' }}>{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Gender"
              name="gender"
              placeholder="Enter Gender"
              value={formData.gender}
              onChange={handleInputChange}
            />
            {errors.gender && (
              <p className="text-rose-600 text-md absolute left-0 " style={{ bottom: '-22px' }}>{errors.gender}</p>
            )}
          </div>

          <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && (
              <p className="text-rose-600 text-md absolute left-0 " style={{ bottom: '-22px' }}>{errors.address}</p>
            )}
          </div>

          <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Child name"
              name="childName"
              placeholder="Enter Your Child name"
              value={formData.childName}
              onChange={handleInputChange}
            />
            {errors.childName && (
              <p className="text-rose-600 text-md absolute left-0 " style={{ bottom: '-22px' }}>{errors.childName}</p>
            )}
          </div>

          <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Child Class"
              name="childClass"
              placeholder="Enter Child class"
              value={formData.childClass}
              onChange={handleInputChange}
            />
            {errors.childClass && (
              <p className="text-rose-600 text-md absolute left-0 " style={{ bottom: '-22px' }}>{errors.childClass}</p>
            )}
          </div>

          <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Child Section"
              name="childSection"
              placeholder="Enter Child Section"
              value={formData.childSection}
              onChange={handleInputChange}
            />
            {errors.childSection && (
              <p className="text-rose-600 text-md absolute absolute left-0 " style={{ bottom: '-22px' }}>{errors.childSection}</p>
            )}
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <Button
            label="Cancel"
            backgroundColor="#FF8A00"
            onClick={() => setVisible(false)}
          />
          <Button
            label="Add"
            backgroundColor="#00A943"
            onClick={handleAdd}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AddNewParentModal;
