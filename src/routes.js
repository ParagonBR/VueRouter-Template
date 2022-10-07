import showBlogs from "./components/showBlogs.vue";

import addBlog from "./components/addBlog.vue";

import home from "./components/home.vue";

export default [
  {
    path: "/",
    name: "Home",
    component: home,
  },
  {
    path: "/new_blog",
    name: "New Blog",
    component: addBlog,
  },
  {
    path: "/blogs",
    name: "Blog List",
    component: showBlogs,
  },
];
