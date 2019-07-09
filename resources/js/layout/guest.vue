<template>
  <v-app>
    <v-toolbar flat>
      <v-toolbar-title>ra</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat href="login">Login</v-btn>
        <v-btn flat href="register">Register</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-divider></v-divider>

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
