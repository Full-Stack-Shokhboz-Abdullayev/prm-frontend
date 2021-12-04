export default {
  loading: {
    color: "#1ABC9C",
    height: "3px",
    continuous: true
  },
  router: {
    extendRoutes(routes) {
      routes.push({
        path: "/",
        component: "~/pages/base/dashboard.vue"
      });
    },
    middleware: ["fetcher"]
  },
  components: [
    "~/components",
    { path: "~/components/widgets", extensions: ["vue"] }
  ],

  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/scss/app.scss",
    "quill/dist/quill.core.css",
    "quill/dist/quill.snow.css",
    "quill/dist/quill.bubble.css"
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    // "~/plugins/fireauth.js",
    // "~/plugins/fakeauth.js",
    "~/plugins/simplebar.js",
    "~/plugins/vue-click-outside.js",
    "~/plugins/vuelidate.js",
    "~/plugins/draggable.js",
    "~/plugins/vue-slidebar.js",
    "~/plugins/tour.js",
    "~/plugins/vue-lightbox.js",
    "~/plugins/mask.js",
    "~/plugins/quill-editor.js",
    "~/plugins/vue-googlemap.js",
    "~/plugins/string-filter",
    "~/plugins/axios.js",
    "~/plugins/vue-datepicker.js",
    "~/plugins/themeLoader.client.js"
  ],

  /*
   ** Nuxt.js modules
   */
  modules: ["bootstrap-vue/nuxt", "@nuxtjs/axios", "@nuxtjs/dotenv"],

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  env: {
    auth: process.env.VUE_APP_DEFAULT_AUTH,
    apikey: process.env.VUE_APP_APIKEY,
    authdomain: process.env.VUE_APP_AUTHDOMAIN,
    databaseurl: process.env.VUE_APP_DATABASEURL,
    projectid: process.env.VUE_APP_PROJECTId,
    storgebucket: process.env.VUE_APP_STORAGEBUCKET,
    message: process.env.VUE_APP_MESSAGINGSENDERID,
    appid: process.env.VUE_APP_APPId,
    measurement: process.env.VUE_APP_MEASUREMENTID
  },
  axios: {
    baseURL: "http://165.22.27.188:5000/api"
  },
  buildModules: [["@nuxtjs/dotenv", { filename: ".env." + process.env.ENV }]]
};
