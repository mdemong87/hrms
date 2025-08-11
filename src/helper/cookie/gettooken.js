function getCookie() {

    const value = `; ${document.cookie}`; // <-- prepend semicolon and space
    const parts = value.split(`; ${"token"}=`);

    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null;
}

export default getCookie;
