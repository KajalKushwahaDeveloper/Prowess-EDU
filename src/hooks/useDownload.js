import { toast } from "react-toastify";

export const useDownloadCsv = () => {
    const downloadCsv = (data, filename = "data.csv") => {
        if (!data || data.length === 0) {
            toast.error("No data available to download");
            return;
        }

        const csvContent = [
            ["Subject", "Class", "Grade", "Student Name", "Marks", "Level", "Recommendation", "Comments", "Date"],
            ...data.map((report) => [
                report.subject,
                report.Class,
                report.grade,
                report.studentName,
                report.marks,
                report.level,
                report.recommendation,
                report.comment,
                new Date(report.createdAt).toLocaleDateString(),
            ]),
        ]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return downloadCsv;
};
