import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../../public/images/logo/logo.png";

const generateSingleEmployeeAttendanceRecoard = async (headers, data, eid, name, position, monthyear, shiftname) => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Header rectangle
    doc.setFillColor(21, 68, 230); // dark blue
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, "F"); // height 40


    const companyName = "";
    const textWidth = doc.getTextWidth(companyName);
    const x = (pageWidth - textWidth) / 2; // center
    doc.text(companyName, x, 15);
    // --- Add Company Logo ---
    doc.addImage(logo.src, "PNG", 78, 8, 53, 15); // x, y, width, height

    // --- Report Title ---
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 255, 255);
    const reportTitle = "Single Employee Attendance Report";
    const reportWidth = doc.getTextWidth(reportTitle);
    doc.text(reportTitle, (pageWidth - reportWidth) / 2, 30);




    // --- Report Title ---
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    const Eid = `Employee ID: ${eid}`;
    doc.text(Eid, 15, 50);
    const Name = `Employee Name: ${name}`;
    doc.text(Name, 15, 58);
    const Position = `Employee Designation: ${position}`;
    doc.text(Position, 15, 66);
    const month = `Report of the Month: ${monthyear}`;
    doc.text(month, 15, 74);
    const shift = `Working Shift: ${shiftname}`;
    doc.text(shift, 15, 82);




    // --- Optional: Date / metadata ---
    const today = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${today}`, pageWidth - 40, 82);


    autoTable(doc, {
        head: headers,
        body: data,
        startY: 91, // leave space after header
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

    doc.save("Single Employee Mohthly Attendance Report.pdf");
};




export default generateSingleEmployeeAttendanceRecoard;