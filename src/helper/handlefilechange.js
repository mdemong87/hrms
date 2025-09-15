import { toast } from "react-toastify";

const handleFileChange = (e, seter, previewseter) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
        toast.warn("Only JPG, JPEG, or PNG files are allowed.");
        e.target.value = ""; // reset the input
        return;
    }

    // ✅ File is valid
    seter(file);
    previewseter(URL.createObjectURL(file));
};

export default handleFileChange;