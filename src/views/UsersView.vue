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
                placeholder="Search for items">
        </div>
    </div>

    <div class="relative overflow-x-auto shadow-md border-t-4 border-pink-500">
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Product name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Color
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Category
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td v-for="user in usersList" :key="user.id"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ console.log(user) }}
                        {{ user.name }}
                        {{ user.email }}
                        {{ user.created_at }}
                        {{ user.updated_at }}
                    </td>
                    <td class="px-6 py-4">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Cookie from 'js-cookie';
// import Swal from 'sweetalert2'

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
        fetchUsers() {
            let url = 'http://127.0.0.1:8000/api/users';
            let config = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookie.get('token')
                },
            }
            fetch(url, config)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na solicitação')
                    }
                    return response.json()
                })
                .then(data => {
                    this.usersList = data.users;
                })
                .catch(error => {
                    console.log(error)
                })

        }
    },
}
</script>