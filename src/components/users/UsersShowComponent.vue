<template>
  <div class="flex pb-2">
    <router-link to="/users"
                 class="bg-pink-500 text-white p-2 rounded hover:bg-pink-600 transition ease-in-out duration-600 mr-2">
      <i class="fa-solid fa-reply"></i>
    </router-link>
    <span class="bg-[#16A34A] hover:bg-green-600 ml-2 flex items-center text-white p-2 rounded">
        Visualizando Morador: <strong>{{ usersList.name }}</strong>
    </span>
  </div>

  <div class="text-start shadow p-6 border-t-4 border-pink-500 max-h-[600px] overflow-y-auto">
    <ol class="relative border-l border-gray-200 dark:border-gray-700 overflow-auto">
      <li class="mb-10 ml-4">
        <div
            class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
        </div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Criado em {{
            fomartDate(usersList.created_at)
          }}
        </time>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Identificação do morador:</h3>
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          {{ usersList.id }}
        </p>
      </li>
      <li class="mb-10 ml-4">
        <div
            class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
        </div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Atualizado em {{
            fomartDate(usersList.updated_at)
          }}
        </time>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Nome:</h3>
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          {{ usersList.name }}
        </p>
      </li>
      <li class="ml-4">
        <div
            class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">E-mail:</h3>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">
          {{ usersList.email }}
        </p>
      </li>
    </ol>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import router from '@/router'
import Swal from 'sweetalert2'
import axios from 'axios';

export default {
  data() {
    return {
      usersList: [],
      userId: this.$route.params.id,
    }
  },
  mounted() {
    this.fetchUsers()
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
    async fetchUsers() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/' + this.userId, {
          headers: {
            'Authorization': 'Bearer ' + Cookie.get('token'),
          }
        })

        this.usersList = response.data.data;
      } catch (error) {
        console.log(error.response)
        if (error.response.status !== 200) {
          this.sweetError(error.response.data.data.message, 'error')
          await router.push('/users')
        }
      }
    },
    fomartDate(dateString) {
      const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
      return new Date(dateString).toLocaleDateString('pt-BR', options);
    }
  }
}
</script>