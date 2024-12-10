import { useState, useEffect } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { fetchPresignedUrl, addVideo, editVideo } from "../../../features/dashboardSharedApi/videosSharedApi";
import capitalize from "lodash/capitalize";
import {videoValidationSchema} from "../../common/validationSchema";

function AddNewVideoModal({ visible, setVisible, mode = "add", initialData = {} }) {
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
  const { presignedUrl = null, loading = false } = useSelector((state) => state.video || {});

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        ...initialData,
        fileName: initialData.fileName || "",
        fileType: initialData.fileType || "",
        videoUrl: initialData.videoUrl || "",
      });
    }
  }, [mode, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "subject" || name === "topic" ? capitalize(value) : value,
    }));
  };

  const uploadToS3 = async (file, presignedUrl) => {
    try {
      const response = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file to S3.");
      }
      toast.success("File uploaded to S3 successfully!");
    } catch (error) {
      console.error("Error uploading to S3:", error);
      toast.error("Error uploading file to S3.");
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ["video/mp4", "video/mkv", "video/avi"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only MP4, MKV, and AVI files are allowed.");
      return;
    }

    try {
      const { name: fileName, type: fileType } = file;
      const fileKey = `${fileName}`; // Using fileName as fileKey

      // Fetch the presigned URL
      const result = await dispatch(fetchPresignedUrl({ fileName: fileKey, fileType })).unwrap();

      // Once presigned URL is fetched, upload the file to S3
      await uploadToS3(file, result?.presignedUrl);

      // Set the video URL with file key
      setFormData((prev) => ({
        ...prev,
        fileName: result?.fileKey,
        fileType,
        videoUrl: result?.presignedUrl, // Store the presigned URL
      }));
    } catch (error) {
      console.error("Error during file upload process:", error);
      toast.error(error?.message || "File upload process failed.");
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await videoValidationSchema.validate(formData, { abortEarly: false });

      const finalVideoUrl = formData.videoUrl;

      let data;
      if (mode === "add") {
        data = await dispatch(addVideo({ ...formData, videoUrl: finalVideoUrl })).unwrap();
        toast.success(data?.data?.message || "Video added successfully!");
      } else if (mode === "edit") {
        data = await dispatch(editVideo({ ...formData, videoUrl: finalVideoUrl })).unwrap();
        toast.success(data?.data?.message || "Video updated successfully!");
      }

      setVisible(false); // Close modal on success
    } catch (error) {
      if (error.inner) {
        error.inner.forEach((err) => toast.error(err.message));
      } else {
        toast.error(error?.message || "Failed to process video.");
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
          {loading && (
            <div className="flex items-center justify-center mt-2">
              <FaSpinner className="animate-spin text-gray-500 text-2xl" />
              <span className="ml-2 text-gray-600">Fetching URL...</span>
            </div>
          )}
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
              ) : mode === "add" ? (
                "Add"
              ) : (
                "Update"
              )
            }
            backgroundColor="#00A943"
            onClick={handleFormSubmit}
            disabled={loading} // Prevent double submission
          />
        </div>
      </div>
    </Modal>
  );
}

export default AddNewVideoModal;
