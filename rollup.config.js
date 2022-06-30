import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";
import html2 from "rollup-plugin-html2";

export default {
  input: "./src/index.js",
  output: {
    format: "umd",
    name: "Vue",
    file: "build/umd/vue.js",
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    serve({
      port: 8000,
      contentBase: "",
      openPage: "index.html",
    }),
  ],
};
