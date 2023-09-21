<template>
  <div class="flex justify-start items-center">
    <button @click="showModal" type="button"
            class="bg-pink-500 text-white p-[.5rem] rounded hover:bg-pink-600 transition ease-in-out duration-600 text-sm">
      Criar condominio
    </button>
  </div>

  <div class="flex flex-wrap gap-4 w-full">
    <div class="mt-4 w-[380px]" v-for="cond in condList" :key="cond.id">
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-100">
          <div class="flex p-2 justify-end"
               :style="'background-color: '+ (cond.color || '#E74694')">
            <i class="fa-solid fa-pen-to-square text-white cursor-pointer" @click="showModalEdit"></i>
          </div>
        <router-link :to="'/condominium/'+ cond.id + '/condominium'" >
          <div :class="'h-14 flex justify-center items-center p-12'"
               :style="'background-color: '+ (cond.color || '#E74694')">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-white w-66 truncate">{{
                cond.name
              }}</h5>
          </div>
          <div class="p-5 w-66 truncate">
            {{ cond.address }}
          </div>
        </router-link>
      </div>
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
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome <span
                class="text-red-500">*</span></label>
            <input type="text" id="name" v-model="name"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                   placeholder="Informe um nome" required>
          </div>
          <div>
            <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço <span
                class="text-red-500">*</span></label>
            <input type="text" id="address" v-model="address"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                   placeholder="Informe o endereço" required>
          </div>

          <div>
            <label for="color" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cor <span
                class="text-red-500 text-xs">(Não obrigatório)</span></label>
            <input type="color" id="color" v-model="color"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
        <button @click="createCond" type="button" :disabled="isLoading"
                class="text-white bg-green-400 hover:bg-green-500 rounded text-sm font-medium px-5 py-2.5 focus:z-10">
          <div role="status" v-if="isLoading">
            <svg aria-hidden="true"
                 class="inline w-8 h-8 mr-2 text-gray-500 animate-spin dark:text-gray-600 fill-white"
                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"/>
              <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
          <span v-else>
            Criar condominio
          </span>
        </button>
      </div>
    </template>
  </Modal>

  <Modal v-if="isShowModalEdit" @close="closeModalEdit">
    <template #header>
      <div class="flex text-lg">
        Edit de condominio
      </div>
    </template>
    <template #body>
      <form>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome <span
                class="text-red-500">*</span></label>
            <input type="text" id="name" v-model="name"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                   placeholder="Informe um nome" required>
          </div>
          <div>
            <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço <span
                class="text-red-500">*</span></label>
            <input type="text" id="address" v-model="address"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                   placeholder="Informe o endereço" required>
          </div>

          <div>
            <label for="color" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cor <span
                class="text-red-500 text-xs">(Não obrigatório)</span></label>
            <input type="color" id="color" v-model="color"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                   placeholder="Informe o endereço" required>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <div class="flex justify-end gap-3">
        <button @click="closeModalEdit" type="button"
                class="text-white bg-red-500 hover:bg-red-600 rounded text-sm font-medium px-5 py-2.5 focus:z-10">
          Fechar
        </button>
        <button @click="createCond" type="button" :disabled="isLoading"
                class="text-white bg-green-400 hover:bg-green-500 rounded text-sm font-medium px-5 py-2.5 focus:z-10">
          <div role="status" v-if="isLoading">
            <svg aria-hidden="true"
                 class="inline w-8 h-8 mr-2 text-gray-500 animate-spin dark:text-gray-600 fill-white"
                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"/>
              <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
          <span v-else>
            Criar condominio
          </span>
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
let isShowModalEdit = ref(false)
export default {
  data() {
    return {
      name: '',
      address: '',
      color: '',
      condList: [],
      isLoading: false
    }
  },
  mounted() {
    this.getCond();
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
    showModalEdit() {
      isShowModalEdit.value = true
    },
    closeModalEdit(){
      isShowModalEdit.value = false
    },
    async createCond() {
      try {
        this.isLoading = true

        const response = await axios.post('http://127.0.0.1:8000/api/condominium', {
          'name': this.name,
          'address': this.address,
          'color': this.color
        }, {
          headers: {
            Authorization: 'Bearer ' + Cookie.get('token')
          }
        })

        if (response.data.error) {
          this.sweet(response.data.message, 'error')
          return;
        }

        if (response.status === 201) {
          this.sweet(response.data.data.message, 'success')
          this.name = ''
          this.address = ''
          this.closeModal()
        }
        window.location.reload()
      } catch (error) {
        if (error.response.status !== 201 || error.response.status !== 200) {
          throw new Error("Erro na solicitação" + error)
        }
      } finally {
        this.isLoading = false
      }
    },
    async getCond() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/condominium', {
          headers: {
            Authorization: 'Bearer ' + Cookie.get('token')
          }
        })

        this.condList = response.data
      } catch (error) {
        if (error.response.status !== 200) {
          throw new Error("Erro na solicitação" + error)
        }
      }
    }
  }
}
</script>