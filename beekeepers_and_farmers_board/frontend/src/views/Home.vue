<template>
     <div class="main">
         <div>
            <router-link to="/signup" >SignUp</router-link>
            <br/>
            <br/>
            <router-link to="/signin" >SignIn</router-link>
         </div>

         <Board />

        <div v-if="type_of_user == 'beekeeper'" class="functions-for-beekeepers">
            <router-link to="/addtender" >Add Tender</router-link>
        </div>
    </div>
</template>

<script>
import Board from '@/components/Board'

export default {
    components: {
        Board
    },
    mounted() {

    },
    data() {
        return {
            type_of_user: "beekeeper",
        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
}
.functions-for-beekeepers {
    margin-left: auto;
    margin-right: 15%;
}
</style>