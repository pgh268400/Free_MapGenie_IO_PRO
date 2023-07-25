const { glob } = require("glob");
const path = require("path");

const result = { app: [] };
glob(`../src/**/*.ts`, { ignore: "../node_modules/**" }).then((files) => {
  files.forEach((file) => {
    const abs_path = path.resolve(file);
    const file_name = path.basename(file);
    const file_name_no_extension = path.parse(file_name).name;

    result.app.push(abs_path);
  });
  console.log(result);
});

console.log(path.resolve(__dirname, "..", "src", "background.ts"));
