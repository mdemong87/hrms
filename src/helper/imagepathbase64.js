function imageToBase64(imagePath) {
    return new Promise((resolve, reject) => {
        const fs = require("fs");
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const base64Image = `data:image/${imagePath.split('.').pop()};base64,${data.toString('base64')}`;
                resolve(base64Image);
            }
        });
    });
}


export default imageToBase64;