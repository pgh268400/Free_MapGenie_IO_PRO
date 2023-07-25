const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { glob } = require("glob");

module.exports = {
  mode: "production",
  // entry: {
  // background: path.resolve(__dirname, "..", "src", "background.ts"),
  // },
  entry: glob
    .sync("../src/**/*.ts", { cwd: __dirname })
    .reduce(function (obj, element) {
      const dir = element.replace("..\\src\\", "");
      obj[dir] = element;
      return obj;
    }, {}),
  // entry: get_entries(),
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: ".", context: "public" }],
    }),
  ],
};

// 재귀적으로 src 폴더 내의 모든 ts 파일을 찾아서 entry로 등록
function get_entries() {
  const result = { app: [] };
  glob("../src/**/*.ts", { cwd: __dirname }).then((files) => {
    files.forEach((file) => {
      console.log(file);
      const abs_path = path.resolve(__dirname, file);
      const file_name = path.basename(file);
      const file_name_no_extension = path.parse(file_name).name;

      // result[file_name_no_extension] = abs_path;
      result.app.push(abs_path);
    });
    // promise 이므로 then 안에서 리턴해야함. (then 밖에서 리턴시 아무것도 안됨.)
    console.log(result);
    return result;
  });
}
