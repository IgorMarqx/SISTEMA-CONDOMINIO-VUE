<template>
  <div class="w-screen h-screen flex">

    <!-- SIDE BAR -->
    <div class="w-[300px] h-full">
      <div class="h-[50px] bg-white flex justify-start items-center bg-[#343A40]">
        <div class="px-[20px]">
          <h3 class="font-bold text-xl text-white">Auda - Condominio</h3>
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] bg-[#343A40] text-white">
        <div class="flex flex-col space-y-[10px] px-[10px] py-[10px]">
          <router-link to="/"
          class="inline-flex relative items-center w-full px-[10px] py-[10px] bg-purpleAuda rounded">
          dashboard
          </router-link>

          <router-link to="/"
            class="inline-flex relative items-center w-full px-[10px] py-[10px] bg-purpleAuda rounded">
            Usuários
          </router-link>
        </div>
      </div>
    </div>
    
    <div class="w-full h-full bg-gray-400">
      <div class="h-[50px] bg-white flex justify-end items-center px-[10px]">
        <button class="bg-green-500" v-on:click="logout()">Sair</button>
      </div>
      <div class="h-[calc(100vh-50px)] bg-green-800 text-white">
        asd
      </div>
    </div>

    <!-- MAIN -->
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
