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
                  class="nav-link"
                  :class="{ active: activeFeed === 'user' }"
                  @click="setFeed('user')"
                  v-if="username"
                  >Your Feed</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
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
          <template v-else>No articles yet...</template>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
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
      return this.$store.getters["users/username"];
    },
    articles() {
      return this.$store.state.articles.feed || [];
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
  },
  created() {
    // fetch all the global feeds on page create
    this.setFeed("global");
  },
};
</script>