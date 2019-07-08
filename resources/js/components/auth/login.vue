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

            <v-btn outline type="submit" color="primary">LOGIN</v-btn>
            <v-btn outline @click="clear">clear</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
    export default {

        data: () => ({
            email: 'takemitsu@notespace.jp',
            password: 'suzuki83',
        }),

        methods: {
            clear() {
                this.email = 'takemitsu@notespace.jp'
                this.password = 'suzuki83'
            }
        }
    }
</script>
