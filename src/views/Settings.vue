<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="user.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                @click.prevent="updateUser"
                class="btn btn-lg btn-primary pull-xs-right"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      // getting the data of the current logged in user in order to prefill the boxes
      return this.$store.getters["users/user"];
    },
  },
  methods: {
    updateUser() {
      // getting all the field values
      const email = this.user.email;
      const username = this.user.username;
      const image = this.user.image;
      const bio = this.user.bio;

      // creating user object from the field values
      const updatedUser = {
        email,
        username,
        image,
        bio,
      };

      // updating the user
      this.$store
        .dispatch("users/updateUser", updatedUser)
        .then(() => {
          // redirecting the user to the home page upon successful updation
          this.$router.push({
            name: "home",
          });
        })
        .catch((e) => {
          // TODO: need to show a toast or other kind of message for errors
          console.error("error", e);
        });
    },
  },
};
</script>
