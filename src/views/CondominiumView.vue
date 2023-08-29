<template>
    <div class="flex justify-start items-center">
        <router-link to="/condominium/create" class="bg-pink-500 text-white p-[.5rem] rounded hover:bg-pink-600 transition ease-in-out duration-600
            text-sm">Criar condominio
        </router-link>
    </div>

    <div class="mt-4">
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg hover:bg-gray-100">
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
</template>

<script>
export default {

}
</script>