<template>
  <div class="w-screen h-screen flex">

    <!-- SIDE BAR -->
    <div class="w-[300px] h-full" v-show="showSide">
      <div class="h-[50px] bg-white flex justify-start items-center bg-[#343A40] border-b border-[#434A51]">
        <div class="px-[20px] flex justify-center items-center space-x-[10px]">
          <img src="../assets/audaLogo.png" alt="" class="w-20">
          <h3 class="text-md text-white"><strong>Auda</strong> Condominio</h3>
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] bg-[#343A40] text-[#CFD2D9] shadow-2xl">
        <div class="flex flex-col justify-between space-y-[10px] px-[10px] py-[10px]">
          <router-link to="/"
            class="inline-flex relative items-center w-full px-[10px] py-[10px] hover:bg-[#494E53] rounded">
            Dashboard
          </router-link>
          <h2 class="inline-flex relative items-center w-full px-[3px] text-sm">
            Processos
          </h2>
          <router-link to="/users"
            class="inline-flex relative items-center w-full px-[10px] py-[10px] hover:bg-[#494E53] rounded">
            Usuários
          </router-link>
        </div>
      </div>
    </div>

    <div class="w-full h-full">
      <div class="h-[50px] bg-white flex justify-between items-center px-[10px] shadow">
        <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
          <font-awesome-icon icon="fa-solid fa-user-secret" />
        </div>
        <div>
          <button class="bg-green-500" v-on:click="logout()">Sair</button>
        </div>
      </div>
      <!-- MAIN -->
      <div class="h-[calc(100vh-50px)] p-[20px]">
        <div>
          <router-view>

          </router-view>
        </div>
      </div>
      <!-- MAIN -->
    </div>

  </div>
</template>

<script>
import Cookie from 'js-cookie'
import router from '@/router'

export default {
  data() {
    return {
      showSide: true,
    }
  },
  methods: {
    logout() {
      Cookie.remove('token')
      router.push('/')
    },

    toggleSideBar() {
      this.showSide = !this.showSide
    },
  },
}
</script>
