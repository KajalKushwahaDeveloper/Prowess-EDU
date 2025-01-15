import * as Yup from "yup";

export const addStudentSchema = Yup.object().shape({
  name: Yup.string().required("Student name is required"),
  parentName: Yup.string().required("Parent name is required"),
  RegNo: Yup.string().required("Registration Number is required"),
  schoolName: Yup.string().required("School Name is required"),
  schoolAddress: Yup.string().required("School Address is required"),
  parentPhone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must be digits")
    .min(10, "Phone number must be at least 10 digits"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  dob: Yup.string().required("Please select a date"),
  gender: Yup.string().required("Gender is required"),
  section: Yup.string().required("Section is required"),
  Class: Yup.string().required("Classes you can teach are required"),
  address: Yup.string().required("Address is required"),
  subjects: Yup.array()
    .of(Yup.string().required("Each subject must be valid"))
    .min(1, "Please select at least one subject")
    .required("Subjects are required"),
});



export const addTeacherSchema = Yup.object().shape({
  name: Yup.string()
    .required("Teacher name is required")
    .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),

  qualification: Yup.string()
    .required("Qualification is required")
    .min(2, "Qualification must be at least 2 characters long"),

  dob: Yup.string().required("Please select a date"),
  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["Male", "Female", "Other"], "Invalid gender selected"),

  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters long"),

  classesCanTeach: Yup.array()
    .of(Yup.string().required("Invalid class selected"))
    .min(1, "Please select at least one class")
    .required("Classes are required"),

    startRange: Yup.number()
    .required("Start Range is required")
    .min(1, "Start Range must be at least 1"),

  endRange: Yup.number()
    .required("End Range is required")
    .min(1, "End Range must be at least 1")
    .test(
      "endRangeGreaterThanStartRange",
      "End Range must be greater than or equal to Start Range",
      function (value) {
        const { startRange } = this.parent;
        return value >= startRange;
      }
    ),
  schoolName: Yup.string().required("School Name is required"),
  schoolAddress: Yup.string().required("School Address is required"),
  experience: Yup.string()
    .required("Experience is required")
    .matches(/^\d+$/, "Experience must be a positive number"),

  subjects: Yup.array()
    .of(Yup.string().required("Each subject must be valid"))
    .min(1, "Please select at least one subject")
    .required("Subjects are required"),
});

export const addParentSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  childName: Yup.string().required("Child Name is required"),
  childClass: Yup.string().required("Classes you can teach are required"),
  childSection: Yup.string().required("Child Section is required"),
  address: Yup.string().required("Address is required"),
});
export const addNewVideoSchema = Yup.object().shape({
  subject: Yup.string().required("Subject is required"),
  chapter: Yup.string().required("Chapter is required"),
  topicName: Yup.string().required("Topic Name is required"),
  Class: Yup.string().required("Class you can teach are required"),
  uploadVideo: Yup.mixed().required("Video upload is required"),
});
export const addNewAssignmentSchema = Yup.object().shape({
  subject: Yup.string()
    .required("Subject is required")
    .max(50, "Subject must be less than 50 characters"),

  chapter: Yup.string()
    .required("Chapter is required")
    .max(50, "Chapter must be less than 50 characters"),

  topic: Yup.string()
    .required("Topic Name is required")
    .max(50, "Topic Name must be less than 50 characters"),

  Class: Yup.string().required("Class is required"),
  assignedTo: Yup.array()
    .of(Yup.string().required("Each student must be valid"))
    .min(1, "At least one student must be assigned")
    .required("Assigned To is required"),

  level: Yup.string()
    .required("Level is required")
    .oneOf(["Easy", "Medium", "Hard"], "Level must be valid"),

  assignFile: Yup.mixed()
    .nullable()
    .required("Assignment file is required")
    .test(
      "fileType",
      "Only PDF, DOC, DOCX, or TXT files are allowed",
      (value) =>
        !value ||
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ].includes(value.type)
    )
    .test(
      "fileSize",
      "File size must be less than 2MB",
      (value) => !value || value.size <= 2 * 1024 * 1024
    ),
  startDate: Yup.date()
    .transform((value, originalValue) => (originalValue === "" ? null : value)) // Transform empty strings to null
    .required("Start date is required")
    .min(new Date(), "Start date must be today or later"),
  startTime: Yup.date()
    .transform((value, originalValue) => (originalValue === "" ? null : value)) // Transform empty strings to null
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after the start date"),
});

export const addNewTestSchema = Yup.object().shape({
  subject: Yup.string()
    .required("Subject is required")
    .max(50, "Subject must be less than 50 characters"),

  chapter: Yup.string()
    .required("Chapter is required")
    .max(50, "Chapter must be less than 50 characters"),

  topic: Yup.string()
    .required("Topic Name is required")
    .max(50, "Topic Name must be less than 50 characters"),

  Class: Yup.string().required("Class is required"),
  assignedTo: Yup.array()
    .of(Yup.string().required("Student name is required"))
    .min(1, "At least one student must be assigned")
    .required("Assigned To is required"),

  level: Yup.string()
    .required("Level is required")
    .oneOf(["Easy", "Medium", "Hard"], "Level must be valid"),

  startDate: Yup.date()
    .transform((value, originalValue) => (originalValue === "" ? null : value)) // Transform empty strings to null
    .required("Start date is required")
    .min(new Date(), "Start date must be today or later"),
  startTime: Yup.string()
    .matches(
      /^([0-1]\d|2[0-3]):([0-5]\d)$/,
      "Start time must be in HH:MM format"
    )
    .required("Start time is required"),
  endTime: Yup.string()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "End time must be in HH:MM format")
    .required("End time is required"),
});
export const createOnlineClassSchema = Yup.object().shape({
  Class: Yup.string().required("Class is required"),
  subject: Yup.string().required("Subject is required"),
  chapter: Yup.string().required("Chapter is required"),
  topic: Yup.string().required("Topic name is required"),
  date: Yup.string().required("Please select a date"),
  time: Yup.string()
    .matches(
      /^([0-1]\d|2[0-3]):([0-5]\d)$/,
      "Start time must be in HH:MM format"
    )
    .required("Start time is required"),
});

export const createTimeTableSchema = Yup.object().shape({
  teacherName: Yup.string().required("Teacher name is required"),
  subject: Yup.string().required("Subject is required"),
  Class: Yup.string().required("Class is required"),
  date: Yup.string().required("Please select a date"),
  startTime: Yup.string()
    .matches(
      /^([0-1]\d|2[0-3]):([0-5]\d)$/,
      "Start time must be in HH:MM format"
    )
    .required("Start time is required"),
  endTime: Yup.string()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "End time must be in HH:MM format")
    .required("End time is required"),
});

export const createReportSchema = Yup.object().shape({
  studentName: Yup.string().required("Student name is required"),
  sID: Yup.string().required("sID is required"),
  subject: Yup.string().required("Subject is required"),
  marks: Yup.string()
    .required("Marks is required")
    .matches(/^[0-9]+$/, "Marks must be digits"),
  assignmentMarks: Yup.string()
    .required("AssignmentMarks is required")
    .matches(/^[0-9]+$/, "Assignment Marks must be digits"),
  testMarks: Yup.string()
    .required("TestMarks is required")
    .matches(/^[0-9]+$/, "Test Marks must be digits"),
  grade: Yup.string().required("Grade is required"),
  level: Yup.string().required("Level is required"),
  recommendation: Yup.string().required("Recommendation is required"),
  comment: Yup.string().required("Comment is required"),
});

export const videoValidationSchema = Yup.object().shape({
  subject: Yup.string().required("Subject is required").trim(),
  chapter: Yup.string().required("Chapter is required").trim(),
  topic: Yup.string().required("Topic is required").trim(),
  Class: Yup.string().required("Class is required").trim(),
  videoFile: Yup.mixed().required("Video file is required"),
});
export const addClassValidationSchema = Yup.object().shape({
  Class: Yup.string().required("Class is required").trim(),
  section: Yup.string().required("Section is required"),
});
