<template>
  <div class="flex pb-2">
    <router-link to="/users"
                 class="bg-pink-500 text-white p-2 rounded hover:bg-pink-600 transition ease-in-out duration-600 mr-2">
      <i class="fa-solid fa-reply"></i>
    </router-link>
    <span class="bg-[#16A34A] hover:bg-green-600 ml-2 flex items-center text-white p-2 rounded">
            Edição de Morador
        </span>
  </div>

  <div class="bg-white shadow-md p-4 mt-2 border-t-4 border-pink-500">
    <form action="" @submit.prevent="edit()">
      <div class="grid gap-6 mb-6 md:grid-cols-2 text-start">
        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 font-bold">
            Nome
            <span class="text-red-500">*</span>
          </label>
          <input type="text" id="name"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2"
                 placeholder="Insira um nome" v-model="userEdit.name">
        </div>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 font-bold">
            E-mail
            <span class="text-red-500">*</span>
          </label>
          <input type="text" id="email"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2"
                 placeholder="Insira um e-mail" v-model="userEdit.email">
        </div>

        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 font-bold">
            Senha
            <span class="text-red-500">*</span>
          </label>
          <input type="password" id="password"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2"
                 placeholder="Insira um e-mail" v-model="password">
        </div>

        <div>
          <label for="password_confirmation" class="block mb-2 text-sm font-medium text-gray-900 font-bold">
            Confirme a senha
            <span class="text-red-500">*</span>
          </label>
          <input type="password" id="password_confirmation"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2"
                 placeholder="Insira um e-mail" v-model="password_confirmation">
        </div>
      </div>
      <!-- SUBMIT BUTTON -->
      <div class="flex flex-col">
        <button type="submit"
                class="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded text-sm w-full sm:w-auto py-1.5 text-center">
          Editar
        </button>
      </div>
      <!-- SUBMIT BUTTON -->
    </form>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import Swal from 'sweetalert2'
import router from '@/router'
import axios from 'axios';

export default {
  data() {
    return {
      password: '',
      password_confirmation: '',
      userEdit: {
        name: '',
        email: ''
      },
      userId: this.$route.params.id
    }
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    sweetError(event, icon) {
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
    async fetchUser() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/' + this.userId, {
          headers: {
            'Authorization': 'Bearer ' + Cookie.get('token'),
          }
        })

        this.userEdit = response.data.data
      } catch (error) {
        if (error.response.status !== 200) {
          this.sweetError(error.response.data.data.message, 'error')
          await router.push('/users')
        }
      }
    },
    async edit() {
      try {
        const response = await axios.put('http://127.0.0.1:8000/api/users/' + this.userId, {
          'name': this.userEdit.name,
          'email': this.userEdit.email,
          'password': this.password,
          'password_confirmation': this.password_confirmation,
          'condominium_id': 1,
          'apartment_id':1
        }, {
          headers: {
            'Authorization': 'Bearer ' + Cookie.get('token'),
          }
        });

        if (response.data.error === true) {
          this.sweetError(response.data.message, 'error');
          return;
        }

        this.sweetError(response.data.data.message, 'success');
        await router.push('/users');
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>