// 1 Crear el componente logico para el elemento 'github-user-card'
// 1.1 referenciarlo a una plantilla propuesta
// 1.2 El componente aceptara una propiedad de entrada "username"
//     debe ser de tipo String y debe ser obligatoria.
// 1.3 Debe poseer en su estado un apartado para guardar un objeto llamado "user"
let githubUserCardComponent = {
  template: "#github-user-card-template",
  props: {
    username: {
      type: String,
      required: true,
      default: "❌ id not provided",
    },
  },
  // Estado del componente
  data() {
    return {
      user: {},
      image: {},
    };
  },
  // Propiedades computadas
  computed: {
    formatedCreatedAt() {
      return new Date(this.user["createdAt"]).toDateString();
    },
  },
  // Usando el hook de creacion para obtener datos
  created() {
    // 1. Obtener el nombre del usuario
    // de la propiedad "username" y lo guardaremos
    // en una constante llamada "id"
    const id = this.username;

    // Hacer un fetch de la informacion del API
    /* eslint-disable no-undef */
    axios
      .get(`http://localhost:1337/api/github-profiles/${id}/?populate=*`)
      .then((res) => {
        // Codigo que quiero ejecutar cuando haya respuesta de github
        this.user = res.data.data.attributes;
        this.image =
          res.data.data.attributes.avatar_image.data.attributes.formats.thumbnail;
      });
  },
};

/* eslint-disable no-undef */
Vue.createApp({
  data() {
    return {
      users: ["1", "2", "3", "4"],
    };
  },
})
  .component("github-user-card", githubUserCardComponent)
  .mount("#app");
