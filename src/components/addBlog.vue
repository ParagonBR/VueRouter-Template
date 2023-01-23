<template>
  <div>
    <!-- <b-modal v-model="modalShow" title="BootstrapVue">
      <p class="my-4">Blog Adicionado com Sucesso</p>
    </b-modal> -->
    <div class="row">
      <div class="blog my-3 col-md-6">
        <h2 class="text-center">Adicionar Post</h2>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-10">
              <div class="form-group">
                <label for="title">Título</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="title"
                  placeholder="Enter Title"
                />
              </div>
              <div class="form-group">
                <label for="description">Descrição</label>
                <textarea
                  class="form-control"
                  id="description"
                  v-model="description"
                  rows="3"
                ></textarea>
              </div>
              <label for="tipo">Tipo</label>
              <div class="form-check d-flex" style="gap: 30px">
                <label class="form-check-label">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    name=""
                    id=""
                    v-model="tipo"
                    value="tipo1"
                  />
                  Tipo 1
                </label>
                <label class="form-check-label">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    name=""
                    v-model="tipo"
                    id=""
                    value="tipo2"
                  />
                  Tipo 2
                </label>
                <label class="form-check-label">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    name=""
                    id=""
                    v-model="tipo"
                    value="tipo3"
                  />
                  Tipo 3
                </label>
              </div>
              <div class="form-group">
                <label for="image">Imagem</label>
                <input
                  type="file"
                  class="form-control"
                  id="image"
                  @change="onFileChange"
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary my-3"
                @click="addBlog"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="preview my-3 col-md-6">
        <h2 class="text-center">Preview</h2>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-sm-10">
              <div class="card">
                <img
                  :src="image"
                  class="card-img-top"
                  style="height: auto"
                  alt="..."
                />
                <div class="card-body">
                  <h4 class="card-title">{{ title }}</h4>
                  <h6>Tags</h6>
                  <div class="d-flex my-3" style="gap: 10px">
                    <span
                      class="badge badge-primary text-black"
                      v-for="tag in tipo"
                      :key="tag"
                    >
                      #{{ tag }}
                    </span>
                  </div>
                  <p class="card-text">{{ description }}</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addBlog",
  data() {
    return {
      title: "",
      description: "",
      image: "",
      tipo: [],
      modalShow: false,
      boxTwo: false,
    };
  },
  methods: {
    onFileChange(e) {
      if (!e.target.files || !e.target.files[0]) {
        this.image = "";
        return;
      }
      this.createImage(e.target.files[0]);
    },
    createImage(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = (e) => {
        this.image = e.target.result;
      };
    },
    async addBlog() {
      try {
        if (
          this.title === "" ||
          this.description === "" ||
          this.image === "" ||
          this.tipo.length === 0
        ) {
          this.showMsgBoxTwo(
            "warning",
            "Erro",
            "Favor preencher todos os campos"
          );
          return;
        }
        let response = await this.$http.post(
          "https://vuejsblogs-99f52-default-rtdb.firebaseio.com/posts.json",
          {
            title: this.title,
            body: this.description,
            image: this.image,
            type: JSON.stringify(this.tipo),
          }
        );
        this.modalShow = true;
        this.showMsgBoxTwo("success", "Eucesso", "Blog Adicionado com Sucesso");
        this.clearProps();
      } catch (error) {
        console.log(error);
        this.showMsgBoxTwo("danger", "Erro", "Erro ao Adicionar Blog");
      }
    },
    showMsgBoxTwo(type = "success", title = "sucesso", msg) {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxOk(msg, {
          title: title,
          size: "sm",
          buttonSize: "sm",
          okVariant: type,
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true,
        })
        .then((value) => {
          this.boxTwo = value;
        })
        .catch((err) => {
          // An error occurred
        });
    },
    clearProps() {
      this.title = "";
      this.description = "";
      this.image = "";
      this.tipo = [];
    },
  },
};
</script>
