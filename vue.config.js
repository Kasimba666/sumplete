const bootstrapSassAbstractsImports = require('vue-cli-plugin-bootstrap-vue/sassAbstractsImports.js')
const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
	devServer: {port: 9000,},
	css: {
        loaderOptions: {
            sass: {
                additionalData: bootstrapSassAbstractsImports.join('\n')
            },
            scss: {
                additionalData: [...bootstrapSassAbstractsImports, ''].join(';\n')
            }
        }
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.geojson$/,
                    loader: 'json-loader'
                }
            ]
        }
    }
})