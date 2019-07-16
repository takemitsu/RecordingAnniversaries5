<template>

  <v-layout row wrap>
    <v-flex xs12 sm8 md6 offset-md3 offset-sm2>
      <v-card>
        <v-card-title class="title">Register</v-card-title>
        <v-card-text>
          <v-form method="post" action="register">

            <v-text-field
                prepend-icon="person"
                v-model="name"
                label="Name"
                required
                name="name"
            ></v-text-field>

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
            <v-text-field
                name="password_confirmation"
                prepend-icon="lock"
                v-model="password_confirm"
                label="Password confirm"
                required
                type="password"
            ></v-text-field>

            <v-btn outline type="submit" color="primary">Register</v-btn>
            <v-btn outline @click="clear">clear</v-btn>
          </v-form>

          <v-alert :value="true" type="warning" outline>
            パスワード再設定の機能はありません<br>忘れないように注意してください。
          </v-alert>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">

    import {Vue, Component} from 'vue-property-decorator'

    @Component
    export default class RegisterCompnent extends Vue {
        name: string = ''
        email: string = ''
        password: string = ''
        password_confirm: string = ''

        clear() {
            this.name = ''
            this.email = ''
            this.password = ''
            this.password_confirm = ''
        }
    }
</script>
