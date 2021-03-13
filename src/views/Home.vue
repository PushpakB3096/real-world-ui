<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class="nav-link pointer-cursor"
                  :class="{ active: activeFeed === 'user' }"
                  @click="setFeed('user')"
                  v-if="username"
                  >Your Feed</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link pointer-cursor"
                  :class="{ active: activeFeed === 'global' }"
                  @click="setFeed('global')"
                  >Global Feed</a
                >
              </li>
            </ul>
          </div>

          <!-- Rendering all the article previews -->
          <template v-if="articles.length != 0">
            <ArticlePreview
              v-for="article in articles"
              :key="article.slug"
              :article="article"
            ></ArticlePreview>
          </template>
          <!-- there will always be atleast one global article. So displaying a loading message for global feed -->
          <template v-else-if="activeFeed === 'global'"
            >Loading articles...</template
          >
          <template v-else>No articles here...</template>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <span v-if="!tags.length">Loading tags...</span>
            <div v-else class="tag-list">
              <template v-for="(tag, idx) in tags" :key="idx">
                <!-- TODO: clicking on name of tag should show the user articles having that tag -->
                <router-link class="tag-pill tag-default" to="/">{{
                  tag
                }}</router-link>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ArticlePreview from "@/components/ArticlePreview";

export default {
  data: function () {
    return {
      activeFeed: null,
    };
  },
  components: {
    ArticlePreview,
  },
  computed: {
    // getting the username of the logged in user from the store
    username() {
      const username =
        this.$store.getters["users/user"] &&
        this.$store.getters["users/user"].username;
      return username;
    },
    articles() {
      return this.$store.getters["articles/feed"] || [];
    },
    tags() {
      return this.$store.getters["tags/tags"] || [];
    },
  },
  methods: {
    setFeed(feedType) {
      switch (feedType) {
        case "user":
          {
            // changes the active tab to user
            this.activeFeed = "user";
            this.$store.dispatch("articles/getUserFeed");
          }
          break;
        case "global":
          {
            // changes the active tab to global
            this.activeFeed = "global";
            this.$store.dispatch("articles/getGlobalFeed");
          }
          break;
      }
    },
    fetchTags() {
      this.$store.dispatch("tags/getTags");
    },
  },
  created() {
    // fetch all the global feeds on page create
    this.setFeed("global");
    this.fetchTags();
  },
};
</script>
<style scoped>
.pointer-cursor {
  cursor: pointer;
}
</style>