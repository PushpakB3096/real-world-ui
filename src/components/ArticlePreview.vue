<template>
  <div class="article-preview">
    <div class="article-meta">
      <a href="profile.html"><img :src="article.author.image" /></a>
      <div class="info">
        <a
          class="author"
          style="cursor: pointer"
          @click="navigateToProfile(article.author.username)"
          >{{ article.author.username }}</a
        >
        <span class="date">{{ formatDate(article.createdAt) }}</span>
      </div>
      <button
        @click="favouriteArticle(article.slug)"
        class="btn btn-outline-primary btn-sm pull-xs-right"
      >
        <i class="ion-heart"></i>
        {{ article.favoritesCount }}
      </button>
    </div>
    <router-link :to="`article/${article.slug}`" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </router-link>
  </div>
</template>
<script>
import moment from "moment";

export default {
  props: ["article"],
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
      this.$store
        .dispatch("articles/favouriteArticle", { slug })
        .then((article) => {
          console.log(article);
        })
        .catch((e) => {
          console.error("An error occured while favourating the article", e);
        });
    },
  },
};
</script>