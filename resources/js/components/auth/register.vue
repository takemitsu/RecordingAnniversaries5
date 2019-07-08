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
                prepend-icon="person"
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

            <v-btn flat type="submit" color="primary">Register</v-btn>
            <v-btn flat @click="clear">clear</v-btn>
          </v-form>

          <v-alert :value="true" type="warning" outline>
            パスワード再設定の機能はありません<br>忘れないように注意してください。
          </v-alert>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
    export default {

        data: () => ({
            name: '',
            email: '',
            password: '',
            password_confirm: ''
        }),

        methods: {
            clear() {
                this.name = 'takemitsu'
                this.email = 'takemitsu@notespace.jp'
                this.password = 'suzuki83'
                this.password_confirm = 'suzuki83'
            }
        }
    }
</script>
