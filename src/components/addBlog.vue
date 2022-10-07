<template>
  <div>
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
      let response = await this.$http.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: this.title,
          body: this.description,
          image: this.image,
          tipo: this.tipo,
        }
      );
      console.log(response);
    },
  },
};
</script>
