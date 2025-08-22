import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../../public/images/logo/logo.png";

const generateAllEmployeeAttendanceDataRecord = async (headers, data, monthyear) => {



    const doc = new jsPDF("landscape");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // --- Header rectangle (first page only) ---
    doc.setFillColor(21, 68, 230);
    doc.rect(0, 0, pageWidth, 40, "F");

    // --- Add Company Logo ---
    doc.addImage(logo.src, "PNG", 122, 8, 53, 15);

    // --- Report Title ---
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 255, 255);
    const reportTitle = "All Employee Attendance Report";
    const reportWidth = doc.getTextWidth(reportTitle);
    doc.text(reportTitle, (pageWidth - reportWidth) / 2, 30);

    // --- Employee Info ---
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`Report of the Month: ${monthyear}`, 15, 52);

    // --- Date ---
    const today = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Printing Date: ${today}`, pageWidth - 55, 52);

    // --- Table with Page Numbers ---
    autoTable(doc, {
        head: headers,
        body: data,
        startY: 60,
        theme: "grid",
        headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 245, 245] },

        didDrawPage: () => {
            const pageCount = doc.internal.getNumberOfPages();
            const pageCurrent = doc.internal.getCurrentPageInfo().pageNumber;
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text(
                `Page ${pageCurrent} of ${pageCount}`,
                pageWidth - 30, // right side
                pageHeight - 10 // bottom
            );
        },
    });

    doc.save("All Employee Attendance.pdf");
};

export default generateAllEmployeeAttendanceDataRecord;
