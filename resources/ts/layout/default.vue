<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-toolbar-title>ra</v-toolbar-title>
      <v-spacer></v-spacer>

        <v-btn text :to="{name:'pickup'}">List</v-btn>
        <v-btn text :to="{name:'entities'}">Edit</v-btn>

        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item href="/logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>


    </v-app-bar>

    <v-divider></v-divider>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-divider></v-divider>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy;{{new Date().getFullYear()}} takemitsu</div>
    </v-footer>
  </v-app>
</template>
