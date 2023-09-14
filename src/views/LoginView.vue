<template>
  <div class="flex justify-center items-center h-screen">
    <div class="flex justify-center items-center w-[16rem]">
      <form action="" @submit.prevent="login(event)">
        <div class="w-[16rem]">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 text-start">E-mail</label>
          <input type="text" id="email" v-model="email"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 placeholder="Informe seu e-mail">
        </div>

        <div class="mt-3 mb-4">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 text-start">Senha</label>
          <input type="password" id="password" v-model="password"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 placeholder="Informe sua senha">
        </div>

        <div class="flex flex-col">
          <button type="submit"
                  class="text-white bg-purple-500 hover:bg-purple-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            Logar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import Cookie from 'js-cookie'
import router from '@/router'
import axios from 'axios'

export default {
  props: [],
  data() {
    return {
      email: '',
      password: '',
      errors: [],
    }
  },
  methods: {
    sweet(e) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: e
      })
    },

    async login() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
          'email': this.email,
          'password': this.password,
        })

        if (response.status === 201) {
          Cookie.set('token', response.data.token)
          await router.push({name: 'home'})
        }
      } catch (error) {
        if (error.response.status === 401) {
          this.errors = error.response.data.data.message
          this.sweet(error.response.data.data.message)
        }
      }
    }
  }
}
</script>