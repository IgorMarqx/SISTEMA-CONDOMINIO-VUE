<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button class="bg-red-500" v-on:click="logout()">Sair</button>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import router from '@/router'

export default {
  methods: {
    logout() {
      Cookie.remove('token')
      router.push('/')
    }
  },
}
</script>
