<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="index.html">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link class="nav-link active" to="/">Home</router-link>
        </li>
        <!-- uncomment below lines when the link is ready -->
        <!-- <li class="nav-item">
          <a class="nav-link" href="">
            <i class="ion-compose"></i>&nbsp;New Post
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </a>
        </li> -->
        <!-- TODO: Conditionally render only one of the below links based on user login status -->
        <li class="nav-item">
          <router-link class="nav-link" to="register">Sign Up</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="login">Login</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
