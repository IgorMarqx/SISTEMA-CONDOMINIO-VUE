<template>
  <div class="flex pb-2">
    <router-link to="/users"
                 class="bg-pink-500 text-white p-2 rounded hover:bg-pink-600 transition ease-in-out duration-600 mr-2">
      <i class="fa-solid fa-reply"></i>
    </router-link>
    <span class="bg-[#16A34A] hover:bg-green-600 ml-2 flex items-center text-white p-2 rounded">
            Criação de Usuários
        </span>
  </div>

  <div class="bg-white shadow-md p-4 mt-2 border-t-4 border-pink-500">
    <form action="" @submit.prevent="register()">
      <div class="grid gap-6 mb-6 md:grid-cols-2 text-start">
        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 font-bold">
            Nome
            <span class="text-red-500">*</span>
          </label>
          <input type="text" id="name" v-model="name"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2"
                 placeholder="Insira um nome">
        </div>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 font-bold">
            E-mail
            <span class="text-red-500">*</span>
          </label>
          <input type="text" id="email" v-model="email"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2"
                 placeholder="Insira um e-mail">
        </div>

        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 font-bold">
            Senha
            <span class="text-red-500">*</span>
          </label>
          <input type="password" id="password" v-model="password"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2"
                 placeholder="Insira uma senha">
        </div>

        <div>
          <label for="password_confirmation" class="block mb-2 text-sm font-medium text-gray-900 font-bold">
            Confirme a senha
            <span class="text-red-500">*</span>
          </label>
          <input type="password" id="password_confirmation" v-model="password_confirmation"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2"
                 placeholder="Confirme sua senha">
        </div>

        <div>
          <label for="condominium_id" class="block mb-2 text-sm font-medium text-gray-900 font-bold">
            Escolha um condominio
          </label>
          <select name="" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2"
                   v-model="condominium_id">
            <option disabled selected>Escolha um condominio</option>
            <option v-for="condominiums in condominiumList" :key="condominiums.id" :value="condominiums.id">{{ condominiums.name }}</option>
          </select>
        </div>

<!--        <div>-->
<!--          <label for="condominium_id" class="block mb-2 text-sm font-medium text-gray-900 font-bold">-->
<!--            Escolha um Apartamento-->
<!--          </label>-->
<!--          <select name="" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2"-->
<!--                  v-for="condominiums in condominiumList" :key="condominiums.id" v-model="condominium_id">-->
<!--            <option :value="condominiums.id">{{ condominiums.name }}</option>-->
<!--          </select>-->
<!--        </div>-->
      </div>
      <!-- SUBMIT BUTTON -->
      <div class="flex flex-col">
        <button type="submit"
                class="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded text-sm w-full sm:w-auto py-1.5 text-center">
          Criar
        </button>
      </div>
      <!-- SUBMIT BUTTON -->
    </form>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import Swal from 'sweetalert2';
import axios from 'axios';
import router from '@/router'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      condominium_id: '',
      apartment_id: '',
      condominiumList: [],
      apartmentList: [],
      errors: [],
    }
  },
  mounted() {
    this.condominiums();
    // this.apartments();
  },
  methods: {
    sweet(event, icon) {
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
        icon: icon,
        title: event
      })
    },
    async register() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/register', {
          'name': this.name,
          'email': this.email,
          'password': this.password,
          'password_confirmation': this.password_confirmation,
          'condominium_id': this.condominium_id,
          'apartment_id': 1
        }, {
          headers: {
            'Authorization': 'Bearer ' + Cookie.get('token'),
          }
        })

        if (response.data.error === true) {
          this.sweet(response.data.message, 'error')
          return;
        }

        this.sweet(response.data.data.message, 'success')
        await router.push('/users')
      } catch (error) {
        throw new Error(error)
      }
    },

    async condominiums() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/condominium', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookie.get('token')
          }
        })

        this.condominiumList = response.data
      } catch (error) {
        throw new Error(error)
      }
    },
    //
    // async apartments() {
    //   try {
    //     const response = await axios.get('http://127.0.0.1:8000/api/apartment', {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + Cookie.get('token'),
    //       }
    //     })
    //     console.log(response)
    //     this.apartmentList = response.data
    //   } catch (error) {
    //     throw new Error(error)
    //   }
    // }

  }
}
</script>