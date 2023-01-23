<template>
  <div>
    <h1 class="text-center m-3">Todos os Posts</h1>
    <div class="container">
      <div class="d-flex m-3 justify-content-center">
        <div class="col-sm-4 d-flex align-items-center">
          <b-form-input
            :id="search"
            v-model.trim="search"
            type="text"
            placeholder="Encontre um post"
          ></b-form-input>
          <b-icon
            style="margin-left: -1.75rem"
            icon="search"
            variant="gray"
            scale="1.5"
          ></b-icon>
        </div>
      </div>
      <div class="row justify-content-center">
        <b-spinner
          v-if="loading_content"
          class="m-5"
          style="width: 5rem; height: 5rem"
        ></b-spinner>

        <div class="col-sm-4 my-3" v-for="blog in filteredBlogs" :key="blog.id">
          <div class="card">
            <img
              style="height: 200px"
              class="card-img-top"
              :src="blog.img"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title" v-rainbow>
                {{ blog.title | capitalize_text }}
              </h5>
              <p class="card-text">{{ blog.body | capitalize_text }}</p>
              <b-link :to="'/blog/' + blog.id" class="btn btn-primary"
                >Ver Post</b-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "showBlogs",
  data() {
    return {
      blogs: [],
      search: "",
      loading_content: true,
    };
  },

  methods: {
    async getBlogs() {
      const url =
        "https://vuejsblogs-99f52-default-rtdb.firebaseio.com/posts.json";

      let { data: blogs } = await this.$http.get(url);

      blogs = Object.keys(blogs).map((key) => {
        return { ...blogs[key], id: key };
      });
      let img = blogs.map(async (_blog) => {
        return await fetch(`https://picsum.photos/300/200?random=2`);
      });

      let links = await Promise.all(img);
      let imgs = links.map((link) => link.url);

      this.blogs = blogs.map((blog, index) => {
        return { ...blog, img: imgs[index] };
      });
    },
    random() {
      return Math.floor(Math.random() * 1000);
    },
  },
  computed: {
    filteredBlogs() {
      return this.blogs.filter(({ title }) =>
        title.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  async beforeMount() {
    this.$moment.locale("pt-br");
    await this.getBlogs();

    this.loading_content = false;
  },
};
</script>
