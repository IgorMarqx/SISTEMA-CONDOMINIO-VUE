<template>
  <div class="flex justify-start items-center">
    <button @click="showModal" type="button"
            class="bg-pink-500 text-white p-[.5rem] rounded hover:bg-pink-600 transition ease-in-out duration-600 text-sm">
      Criar condominio
    </button>
  </div>

  <div class="mt-4">
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-100">
      <router-link to="/home">
        <div class="bg-red-500 h-14 flex justify-center items-center">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-white">Condominio Vivara</h5>
        </div>
        <div class="p-5">
          Descrição do Condominio
        </div>
      </router-link>
    </div>
  </div>


  <Modal v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex text-lg">
        Criação de condominio
      </div>
    </template>
    <template #body>

      <form>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome <span
                class="text-red-500">*</span></label>
            <input type="text" id="first_name" v-model="name"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Informe um nome" required>
          </div>
          <div>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço <span
                class="text-red-500">*</span></label>
            <input type="text" id="last_name" v-model="address"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Informe o endereço" required>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <div class="flex justify-end gap-3">
        <button @click="closeModal" type="button"
                class="text-white bg-red-500 hover:bg-red-600 rounded text-sm font-medium px-5 py-2.5 focus:z-10">
          Fechar
        </button>
        <button @click="createCond" type="button"
                class="text-white bg-green-400 hover:bg-green-500 rounded text-sm font-medium px-5 py-2.5 focus:z-10">
          Criar condominio
        </button>
      </div>
    </template>
  </Modal>

</template>

<script setup>
import {Modal} from 'flowbite-vue'
</script>

<script>
import axios from "axios";
import Cookie from "js-cookie";
import Swal from "sweetalert2";
import {ref} from "vue";

let isShowModal = ref(false)
export default {
  data() {
    return {
      name: '',
      address: '',
    }
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
    closeModal() {
      isShowModal.value = false
    },
    showModal() {
      isShowModal.value = true
    },
    async createCond() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/condominium', {
          name: this.name,
          address: this.address
        }, {
          headers: {
            Authorization: 'Bearer ' + Cookie.get('token')
          }
        })

        if (response.data.error) {
          this.sweet(response.data.message, 'error')
        }

        if (response.status === 201) {
          this.sweet(response.data.data.message, 'success')
          this.name = ''
          this.address = ''
          this.closeModal()
        }
      } catch (error) {
        if (error.response.status !== 201 || error.response.status !== 200) {
          throw new Error("Erro na solicitação" + error)
        }
      }
    }
  }
}
</script>