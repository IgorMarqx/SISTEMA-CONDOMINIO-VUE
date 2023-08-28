<template>
    <div class="flex justify-between items-center pb-4">
        <div class="flex justify-center items-center">
            <router-link to="/users/create"
                class="bg-pink-500 text-white p-[.5rem] rounded hover:bg-pink-600 transition ease-in-out duration-600 text-sm">Novo
                Usuário</router-link>
        </div>

        <div class="relative mt-1">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>
            <input type="text" id="table-search"
                class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Pesquisar...">
        </div>
    </div>

    <div class="relative overflow-auto shadow-md border-t-4 border-pink-500 overflow-auto max-h-[600px]">
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        #
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Nome
                    </th>
                    <th scope="col" class="px-6 py-3">
                        E-mail
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Data de Criação
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Data de edição
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Ações
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b hover:bg-gray-100" v-for="user in   usersList  " :key="user.id">
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ user.id }}
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {{ user.name }}
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {{ user.email }}
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {{ fomartDate(user.created_at) }}
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {{ fomartDate(user.updated_at) }}
                    </td>
                    <td class="px-6 py-4">
                        <router-link :to="'/users/' + user.id + '/show'">
                            <i class="fa-solid fa-eye text-yellow-300 text-lg mr-4 hover:text-yellow-400"></i>
                        </router-link>
                        <router-link :to="'/users/' + user.id + '/edit'">
                            <i class="fa-solid fa-pen-to-square text-green-500 text-lg mr-4 hover:text-green-600"></i>
                        </router-link>
                        <span class="cursor-pointer">
                            <i class="fa-regular fa-trash-can text-red-500 text-lg hover:text-red-600"></i>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- <div>
            <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
            <button @click="nextPage" :disabled="currentPage === totalPages">Próxima</button>
        </div> -->
    </div>
</template>

<script>
import Cookie from 'js-cookie';
import axios from 'axios';

export default {
    data() {
        return {
            usersList: [],
        }
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users', {
                    headers: {
                        'Authorization': 'Bearer ' + Cookie.get('token')
                    }
                })

                if (response.status !== 200) {
                    throw new Error('Erro na solicitação');
                }

                this.usersList = response.data;
            } catch (error) {
                console.error(error)
            }
        },

        fomartDate(dateString) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return new Date(dateString).toLocaleDateString('pt-BR', options);
        }
    },
}
</script>