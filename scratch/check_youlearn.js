const https = require("https");
const files = [
  "src/controllers/authController.js",
  "src/routes/authRoutes.js",
  "src/middlewares/authMiddleware.js",
  "src/controllers/enrollmentController.js",
  "src/routes/enrollmentRoutes.js",
  "src/controllers/progressController.js",
  "src/routes/progressRoutes.js",
  "src/models/Enrollment.js"
];

function fetchFile(f) {
  return new Promise((resolve) => {
    https.get("https://raw.githubusercontent.com/bouhouchhamza/LMS_YouLearn/main/" + f, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => resolve({ file: f, status: res.statusCode, length: data.length, sample: data.slice(0, 200) }));
    }).on("error", (e) => resolve({ file: f, error: e.message }));
  });
}

Promise.all(files.map(fetchFile)).then(results => console.log(JSON.stringify(results, null, 2)));
