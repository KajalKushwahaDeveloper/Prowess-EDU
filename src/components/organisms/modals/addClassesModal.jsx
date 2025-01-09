import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Modal from "../../common/modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ButtonText from "../../atoms/buttonText";
import { FaSpinner } from "react-icons/fa";
import { addClassSection } from "../../../features/dashboardSharedApi/classSectionReducer";
import { addClassValidationSchema } from "../../common/validationSchema";

function AddClassesModal({ visible, setVisible }) {
  const [formData, setFormData] = useState({
    Class: "",
    section: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.sharedApi);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = async () => {
    try {
      await addClassValidationSchema.validate(formData, { abortEarly: false });
      await dispatch(addClassSection({ payload: formData })).unwrap();
      toast.success("Class section added successfully!");
      setFormData({
        Class: "",
        section: "",
      });
      setVisible(false);
    } catch (err) {
      if (err?.inner) {
        const validationErrors = {};
        err.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
        toast.error("Validation failed. Please fix the errors.");
      } else {
        toast.error(
          err?.message || "Failed to add class and section. Please try again."
        );
      }
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
      <div className="bg-white lg:m-0 m-4">
        <h1 className="font-medium text-2xl my-2">Add Student Class</h1>
        <hr className="mb-8 border-gray-300" />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Student Class"
              name="Class"
              placeholder="Enter Class"
              value={formData.Class}
              onChange={handleInputChange}
            />
            {errors.Class && (
              <p
                className="text-rose-600 text-md  absolute left-0 "
                style={{ bottom: "-22px" }}
              >
                {errors?.Class}
              </p>
            )}
          </div>
          <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Student Section"
              name="section"
              placeholder="Enter Section"
              value={formData.section}
              onChange={handleInputChange}
            />
            {errors.section && (
              <p
                className="text-rose-600 text-md  absolute left-0 "
                style={{ bottom: "-22px" }}
              >
                {errors?.section}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <ButtonText
            label="Cancel"
            backgroundColor="#FF8A00"
            onClick={() => setVisible(false)}
          />
          <ButtonText
            label={
              loading ? (
                <FaSpinner className="animate-spin text-white mx-auto text-3xl" />
              ) : (
                "Add"
              )
            }
            backgroundColor="#00A943"
            onClick={handleAdd}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AddClassesModal;
