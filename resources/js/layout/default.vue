<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>ra</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat :to="{name: 'pickup'}">Pickup</v-btn>
        <v-btn flat :to="{name:'entities'}">Entities</v-btn>
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
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy;@{{new Date().getFullYear()}} takemitsu</div>
    </v-footer>
  </v-app>
</template>
