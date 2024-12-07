import { useState, useEffect } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  fetchPresignedUrl,
  addVideo,
} from "../../../features/dashboardSharedApi/videosSharedApi";

function AddNewVideoModal({
  visible,
  setVisible,
  mode = "add",
  initialData = {},
}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fileName: "",
    fileType: "",
    videoUrl: "",
    subject: "",
    chapter: "",
    topic: "",
    Class: "",
    ...initialData,
  });
  const { presignedUrl = null, loading = false } = useSelector(
    (state) => state.video || {}
  );

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ["video/mp4", "video/mkv", "video/avi"];
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Invalid file type. Only MP4, MKV, and AVI files are allowed."
      );
      return;
    }

    try {
      const { name: fileName, type: fileType } = file;

      // Generate fileKey with the format: timestamp.filename
      const fileKey = `${fileName.replace(/\s+/g, "%20")}`;

      // Fetch the presigned URL
      const result = await dispatch(
        fetchPresignedUrl({ fileName: fileKey, fileType })
      ).unwrap();
      console.log("PresignedUrlresult:", result);

      setFormData((prev) => ({
        ...prev,
        fileName: fileKey, // Store the generated file key
        fileType,
        videoUrl: result, // Store the presigned URL
      }));

      toast.success("Presigned URL fetched successfully!");
    } catch (error) {
      console.error("Error fetching presigned URL:", error);
      toast.error(error?.message || "Failed to fetch presigned URL");
    }
  };

  // Generate the final video URL with the calculated timestamp
  const generateVideoUrl = () => {
    const baseUrl = formData.videoUrl; // The presigned base URL
    const fileName = formData.fileName.replace(/\s+/g, "%20"); // Encode spaces in filename
    const baseWithoutFileName = baseUrl.substring(
      0,
      baseUrl.lastIndexOf("/") + 1
    ); // Remove the file name from the URL
    return `${baseWithoutFileName}${fileName}`;
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!formData.videoUrl) {
      toast.error("Please upload a video before submitting.");
      return;
    }

    const finalVideoUrl = generateVideoUrl(); // Construct the video URL

    console.log("addVideo:", finalVideoUrl);

    try {
      const data = await dispatch(
        addVideo({ ...formData, videoUrl: finalVideoUrl })
      ).unwrap();
      toast.success(data?.data?.message || "Video added successfully!");
      setVisible(false);
    } catch (error) {
      console.error("Error adding video:", error);
      toast.error(error?.message || "Failed to add video");
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
      <div className="bg-white m-4">
        <h1 className="font-medium text-2xl my-2">
          {mode === "add" ? "Add new Video" : "Edit Video"}
        </h1>
        <hr className="mb-8 border-gray-300" />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <InputFieldWithLabel
            type="text"
            labelText="Subject"
            name="subject"
            placeholder="Enter Subject"
            value={formData.subject}
            onChange={handleInputChange}
          />
          <InputFieldWithLabel
            type="text"
            labelText="Chapter"
            name="chapter"
            placeholder="Enter Chapter"
            value={formData.chapter}
            onChange={handleInputChange}
          />
          <InputFieldWithLabel
            type="text"
            labelText="Topic Name"
            name="topic"
            placeholder="Enter Topic Name"
            value={formData.topic}
            onChange={handleInputChange}
          />
          <InputFieldWithLabel
            type="text"
            labelText="Class"
            name="Class"
            placeholder="Enter Class"
            value={formData.Class}
            onChange={handleInputChange}
          />
          <InputFieldWithLabel
            type="file"
            labelText="Upload Video"
            name="uploadVideo"
            onChange={handleFileUpload}
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            label="Cancel"
            backgroundColor="#FF8A00"
            onClick={() => setVisible(false)}
          />
          <Button
            label={
              loading ? (
                <FaSpinner className="animate-spin text-white mx-auto text-3xl" />
              ) : (
                "Add"
              )
            }
            backgroundColor="#00A943"
            onClick={handleFormSubmit}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AddNewVideoModal;
