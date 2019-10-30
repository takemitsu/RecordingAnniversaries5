<template>

  <v-layout row wrap>
    <v-flex xs12 sm8 md6 offset-md3 offset-sm2>
      <v-card>
        <v-card-title class="title">Login</v-card-title>
        <v-card-text>
          <v-form method="post" action="login">

            <v-text-field
                prepend-icon="email"
                v-model="email"
                label="E-mail"
                required
                name="email"
            ></v-text-field>

            <v-text-field
                name="password"
                prepend-icon="lock"
                v-model="password"
                label="Password"
                required
                type="password"
            ></v-text-field>

            <v-switch v-model="remember" label="Remember Me"></v-switch>

            <v-btn outlined type="submit" color="primary">LOGIN</v-btn>
            <v-btn outlined @click="clear">clear</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'

    @Component
    export default class LoginComponent extends Vue {
        email: string = ''
        password: string = ''
        remember: boolean = false

        clear() {
            this.email = ''
            this.password = ''
            this.remember = false
        }
    }
</script>
