<template>
  <v-app>
    <v-toolbar flat>
      <v-toolbar-title>ra</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat :to="{name: 'pickup'}">List</v-btn>
        <v-btn flat :to="{name:'entities'}">Edit</v-btn>
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-tile href="/logout">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

      </v-toolbar-items>
    </v-toolbar>

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
