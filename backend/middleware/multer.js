import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`
        callback(null, uniqueName)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
        if (!file.mimetype.startsWith("image/")) {
            callback(new Error("Only image uploads are supported"));
            return;
        }

        callback(null, true);
    }
})

export default upload
