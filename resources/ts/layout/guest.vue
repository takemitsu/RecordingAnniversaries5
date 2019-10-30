<template>
  <v-app>
  <v-app-bar app>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>ra</v-toolbar-title>


      <v-spacer></v-spacer>

    <v-btn text href="login">Login</v-btn>
    <v-btn text href="register">Register</v-btn>

  </v-app-bar>



    <v-content>
      <v-container grid-list>
        <slot></slot>
      </v-container>
    </v-content>

    <v-divider></v-divider>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy;{{new Date().getFullYear()}} takemitsu.</div>
    </v-footer>

  </v-app>
</template>
