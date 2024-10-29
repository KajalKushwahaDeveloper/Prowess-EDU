import * as Yup from "yup";

export const addStudentSchema = Yup.object().shape({
    studentName: Yup.string().required("Student name is required"),
    parentName: Yup.string().required("Parent name is required"),
    phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]+$/, "Phone number must be digits")
        .min(10, "Phone number must be at least 10 digits"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    dob: Yup.date()
        .typeError("Date of Birth must be a valid date")
        .nullable() // Allows an empty value until the user selects a date
        .required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    section: Yup.string().required("Section is required"),
    class: Yup.string().required("Class is required"),
    address: Yup.string().required("Address is required"),
    subjects: Yup.string().required("Subjects are required"),
});

export const addTeacherSchema = Yup.object().shape({
    teacherName: Yup.string().required("Teacher name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string()
        .matches(/^\d+$/, "Phone number must contain only digits")
        .required("Phone number is required"),
    qualification: Yup.string().required("Qualification is required"),
    dob: Yup.date()
        .typeError("Date of Birth must be a valid date")
        .nullable() // Allows an empty value until the user selects a date
        .required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    classYouCanTeach: Yup.string().required("Classes you can teach is required"),
    experience: Yup.string().required("Experience is required"),
    subjects: Yup.string().required("Subjects are required"),
});
