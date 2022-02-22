import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"

export default {
    input: "src/purifycss.js",
    output: [
        {
            file: "lib/purifycss.es.js",
            format: "es"
        },
        {
            file: "lib/purifycss.js",
            format: "cjs",
            exports: "default"
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        babel({
            babelHelpers: "bundled",
            exclude: "node_modules/**",
            presets:[
                [
                    "@babel/env",
                    {
                        "modules": false,
                    }
                ]
            ]
        })
    ],
    external: ["clean-css", "glob", "rework", "uglifyjs"]
}
