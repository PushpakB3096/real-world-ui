<template>
  <div class="article-preview">
    <div class="article-meta">
      <a href="profile.html"><img :src="author.image" /></a>
      <div class="info">
        <a
          class="author"
          style="cursor: pointer"
          @click="navigateToProfile(author.username)"
          >{{ article.author.username }}</a
        >
        <span class="date">{{ formatDate(createdAt) }}</span>
      </div>
      <button
        @click="favouriteArticle(slug)"
        class="btn btn-sm pull-xs-right"
        :class="{
          'btn-primary': favorited,
          'btn-outline-primary': !favorited,
        }"
      >
        <i class="ion-heart"></i>
        {{ favoritesCount }}
      </button>
    </div>
    <router-link :to="`article/${slug}`" class="preview-link">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <span>Read more...</span>
    </router-link>
  </div>
</template>
<script>
import moment from "moment";

export default {
  props: ["article"],
  computed: {
    // destructuring article details using computed properties
    title() {
      return this.article.title;
    },
    description() {
      return this.article.description;
    },
    slug() {
      return this.article.slug;
    },
    favoritesCount() {
      return this.article.favoritesCount;
    },
    favorited() {
      return this.article.favorited;
    },
    author() {
      return this.article.author;
    },
    createdAt() {
      return this.article.createdAt;
    },
  },
  methods: {
    formatDate(date) {
      // format is 18th Feb 2016
      return moment(date).format("Do MMM YYYY");
    },
    navigateToProfile(username) {
      this.$router.push({
        name: "profile",
        params: {
          username,
        },
      });
    },
    favouriteArticle(slug) {
      // clicking the favourite button will favourite the article for the loggedin user
      this.$store
        .dispatch("articles/favouriteArticle", { slug })
        .then(() => {})
        .catch((e) => {
          console.error("An error occured while favourating the article", e);
        });
    },
  },
};
</script>
<style scoped>
.invert_fav_btn_colour {
  background: #5cb85c;
}
</style>