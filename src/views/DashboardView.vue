<template>
  <div class="w-screen h-screen flex overflow-hidden">

    <!-- SIDE BAR -->
    <div class="w-[300px] h-full" v-show="showSide">
      <div class="h-[50px] flex justify-start items-center bg-[#343A40] border-b border-[#434A51]">
        <div class="px-[20px] flex justify-center items-center space-x-[10px]">
          <img src="../assets/audaLogo.png" alt="" class="w-20">
          <h3 class="text-md text-[#CFD2D9]"><strong class="text-pink-500">Auda</strong> Condominio</h3>
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] bg-[#343A40] text-[#CFD2D9] shadow-2xl">
        <div class="flex flex-col justify-between space-y-[10px] px-[10px] py-[10px]">
          <router-link to="/dashboard"
            class="inline-flex relative items-center w-full px-[10px] py-[7px] hover:bg-[#494E53] rounded"
            :class="{ 'bg-pink-500 text-white hover:bg-pink-500': $route.path === '/dashboard' }">
            <i class="fa-solid fa-gauge mr-3 text-sm"></i>
            Dashboard
          </router-link>
          <h2 class="inline-flex relative items-center w-full px-[3px] text-sm">
            Administração
          </h2>
          <router-link to="/users"
            class="inline-flex relative items-center w-full px-[10px] py-[7px] hover:bg-[#494E53] rounded"
            :class="{ 'bg-pink-500 text-white hover:bg-pink-500': $route.path === '/users' || $route.path === '/users/create' || $route.path.match(/^\/users\/\d+\/edit$/)}">
            <i class="fa-solid fa-user mr-3 text-sm"></i>
            <span>Usuários</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- SIDE BAR -->
    <div class="w-full h-full">
      <div class="h-[50px] bg-white flex justify-between items-center px-[10px] shadow">
        <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
          <i class="fa-solid fa-bars"></i>
        </div>
        <div class="flex justify-center items-center">
          <button class="w-4" v-on:click="logout()"><i class="fa-solid fa-power-off"></i></button>
        </div>
      </div>
      <!-- SIDE BAR -->
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
  watch: {
    '$route'() {
      // console.log(this.$route.path)
    }
  }
}
</script>
