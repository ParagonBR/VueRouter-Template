import showBlogs from "./components/showBlogs.vue";

import addBlog from "./components/addBlog.vue";

export default [
  {
    path: "/",
    name: "Home",
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
