import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { fetchPresignedUrl, addVideo } from "../../../features/dashboardSharedApi/videosSharedApi";

function AddNewVideoModal({ visible, setVisible, mode = "add", initialData = {} }) {
    const dispatch = useDispatch();
    const { presignedUrl, loading } = useSelector((state) => state.video);
    const [videoData, setVideoData] = useState({
      title: "",
      description: "",
      fileName: "",
      fileType: "",
      videoUrl: "",
      ...initialData,
    });
  
    // Handle file upload
    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      const fileName = file.name;
      const fileType = file.type;
  
      try {
        await dispatch(fetchPresignedUrl({ fileName, fileType })).unwrap();
        setVideoData((prev) => ({
          ...prev,
          fileName,
          fileType,
          videoUrl: presignedUrl, // presignedUrl contains the URL to upload the file
        }));
        toast.success("Presigned URL fetched successfully!");
      } catch (error) {
        toast.error(error?.message || "Failed to fetch presigned URL");
      }
    };
  
    // Handle form submission
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        const data = await dispatch(addVideo(videoData)).unwrap();
        toast.success(data?.data?.message || "Video added successfully!");
      } catch (error) {
        toast.error(error?.message || "Failed to add video");
      }
    };
  return (
    <Modal visible={visible} setVisible={setVisible} style={{ width: "50vw", maxWidth: "700px" }} onHide={() => setVisible(false)} className="rounded-lg">
      <div className="bg-white m-4">
        <h1 className="font-medium text-2xl my-2">{mode === "add" ? "Add new Video" : "Edit new Video"}</h1>
        <hr className="mb-8 border-gray-300" />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Subject"
              name="subject"
              placeholder="Enter Subject"
              value={formData.subject}
              onChange={handleInputChange}
            />
            {errors.subject && <p className="text-rose-600 text-md absolute left-0" style={{ bottom: '-22px' }}>{errors.subject}</p>}
          </div>
          <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Chapter"
              name="chapter"
              placeholder="Enter Chapter"
              value={formData.chapter}
              onChange={handleInputChange}
            />
            {errors.chapter && <p className="text-rose-600 text-md absolute left-0" style={{ bottom: '-22px' }}>{errors.chapter}</p>}
          </div>
          <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Topic Name"
              name="topicName"
              placeholder="Enter Topic Name"
              value={formData.topicName}
              onChange={handleInputChange}
            />
            {errors.topicName && <p className="text-rose-600 text-md absolute left-0" style={{ bottom: '-22px' }}>{errors.topicName}</p>}
          </div>
          <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Class"
              name="class"
              placeholder="Enter Class"
              value={formData.class}
              onChange={handleInputChange}
            />
            {errors.class && <p className="text-rose-600 text-md absolute left-0" style={{ bottom: '-22px' }}>{errors.class}</p>}
          </div>
          <div className="relative">
            <InputFieldWithLabel
              type="file"
              labelText="Upload Video"
              name="uploadVideo"
              onChange={handleFileChange}
            />
            {errors.uploadVideo && <p className="text-rose-600 text-md absolute left-0" style={{ bottom: '-22px' }}>{errors.uploadVideo}</p>}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <Button label="Cancel" backgroundColor="#FF8A00" onClick={() => setVisible(false)} />
          <Button
            label={loading ? <FaSpinner className="animate-spin text-white mx-auto text-3xl" /> : "Add"}
            backgroundColor="#00A943"
            onClick={handleAdd}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AddNewVideoModal;
