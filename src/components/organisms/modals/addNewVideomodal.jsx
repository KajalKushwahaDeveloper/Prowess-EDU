import { useState, useEffect } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { fetchPresignedUrl, addVideo, editVideo } from "../../../features/dashboardSharedApi/videosSharedApi";
import capitalize from "lodash/capitalize";
import { videoValidationSchema } from "../../common/validationSchema";
import SubjectTypeDropdown from "../../molecules/subjectTypesDropdown";
import ClassTypeDropdown from "../../molecules/classTypeDropdown";
import ButtonText from "../../atoms/buttonText";

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
    videoFile: null, // Add videoFile field
    ...initialData,
  });
  const { presignedUrl = null, loading = false, errors = {} } = useSelector((state) => state.video || {});
console.log("formData:",formData);

  // useEffect(() => {
  //   if (mode === "edit" && initialData) {
  //     setFormData({
  //       ...initialData,
  //       fileName: initialData.fileName || "",
  //       fileType: initialData.fileType || "",
  //       videoUrl: initialData.videoUrl || "",
  //     });
  //   }
  // }, [mode, initialData]);

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
      const fileKey = `${fileName}`;

      // Fetch the presigned URL
      const result = await dispatch(fetchPresignedUrl({ fileName: fileKey, fileType })).unwrap();

      // Upload the file to S3
      await uploadToS3(file, result?.presignedUrl);

      // Update formData with the uploaded file and URL
      setFormData((prev) => ({
        ...prev,
        videoFile: file, // Store the actual file
        fileName: result?.fileKey,
        fileType,
        videoUrl: result?.presignedUrl,
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
        await dispatch(addVideo({ ...formData, videoUrl: finalVideoUrl })).unwrap();
        toast.success(data?.data?.message || "Video added successfully!");
      } else if (mode === "edit") {
        const payload = {
          subject: formData.subject,
          chapter: formData.chapter,
          topic: formData.topic,
          Class: formData.Class,
          videoUrl: formData.videoUrl,
          fileName: formData.fileName,
          fileType: formData.fileType,
        };

        console.log("Edit Payload:", payload);

        await dispatch(editVideo({ id: initialData.id, payload })).unwrap();
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
          <div className="relative">
            <SubjectTypeDropdown
              label="Subjects"
              name="subject"
              value={formData.subject || ""}
              onChange={handleInputChange}
            />
            {errors.subject && (
              <p className="text-rose-600 text-md absolute left-0" style={{ bottom: '-22px' }}>
                {errors?.subject}
              </p>
            )}
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
            {errors.chapter && (
              <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.chapter}</p>
            )}
          </div>
          <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Topic Name"
              name="topic"
              placeholder="Enter Topic Name"
              value={formData.topic}
              onChange={handleInputChange}
            />
            {errors.topic && (
              <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.topic}</p>
            )}
          </div>
          <div className="relative">
            <ClassTypeDropdown
              label="Class"
              name="Class"
              value={formData.Class}
              onChange={handleInputChange}
            />
            {errors.Class && (
              <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.Class}</p>
            )}
          </div>
          <div className="relative">
            <InputFieldWithLabel
              type="file"
              labelText="Upload Video"
              name="uploadVideo"
              value={formData.fileName}
              onChange={handleFileUpload}
            />
          
            {errors.uploadVideo && (
              <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.uploadVideo}</p>
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