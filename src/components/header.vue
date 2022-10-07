<template>
  <div>
    <b-navbar type="dark" variant="dark" toggleable="md">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-navbar-brand class="mx-4" to="/">Home</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown text="Blogs" left>
            <b-dropdown-item
              v-for="route in routes"
              :key="route.name"
              :to="route.path"
              >{{ route.name }}</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav class="mx-auto" style="margin-right: 1.5rem !important">
          <b-nav-item-dropdown text="User">
            <b-dropdown-item href="#">Account</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "custom-header",
  data() {
    return {
      routes: [],
    };
  },

  created() {
    this.$router.options.routes.forEach((route) => {
      this.routes.push({
        name: route.name,
        path: route.path,
      });
    });
  },
};
</script>
