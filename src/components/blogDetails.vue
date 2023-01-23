<template>
  <div>
    <div
      v-if="loading_content"
      class="d-flex justify-content-center align-items-center"
      style="height: 90vh"
    >
      <b-spinner class="m-5" style="width: 5rem; height: 5rem"></b-spinner>
    </div>

    <div class="blogDetail m-5" v-if="loading_content == false">
      <div class="d-flex justify-content-center">
        <div class="card col-sm-6">
          <div class="card-body">
            <img
              :src="blog.img"
              class="mb-2"
              style="width: 100%; height: 300px; border-radius: 5px"
              alt=""
            />
            <h5 class="card-title">{{ blog.title | capitalize_text }}</h5>
            <p class="card-text">{{ blog.body | capitalize_text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "blogDetails",
  data() {
    return {
      blog: {},
      loading_content: true,
    };
  },
  methods: {
    async getBlog() {
      const url = `https://vuejsblogs-99f52-default-rtdb.firebaseio.com/posts/${this.$route.params.id}.json/`;

      let { data: blog } = await this.$http.get(url);

      if (blog == null) {
        this.$router.push("/");
        return;
      }
      if(blog.image == null){
       let img = await fetch(`https://picsum.photos/500/300?random=2`);
        blog = { ...blog, img: img.url };
      }
      else{
        blog = { ...blog, img: blog.image };
      }

      

      this.blog = blog;
    },
  },
  async beforeMount() {
    await this.getBlog();
    this.loading_content = false;
  },
};
</script>
