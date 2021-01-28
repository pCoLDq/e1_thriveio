<template>
     <div class="main">
         <div class="auth">
            <router-link to="/signup" ><p class="link">SignUp</p> </router-link>
            <br/>
            <br/>
            <router-link to="/signin" > <p class="link">SignIn</p> </router-link>
         </div>

         <Board />

        <div v-if="userType == 'beekeeper'" class="functions-for-beekeepers">
            <router-link to="/addtender" > <p class="link">Add Tender</p> </router-link>
        </div>
    </div>
</template>

<script>
import Board from '@/components/Board'

export default {
    components: {
        Board
    },
    data() {
        return {
            userType: "beekeeper",
        }
    },
    mounted() {

    },
}
</script>

<style scoped>
.main {
    display: flex;
}
.auth {
    display: flex;
}
.functions-for-beekeepers {
    margin-left: auto;
    margin-right: 15%;
}
a {
    text-decoration: none;
}
.link {
    border:1px solid #59a66b;
    position: relative;
    text-decoration: none;
    padding: 10px;
    margin-right: 20px;
    color: #59a66b;
    font-weight: 600;
    font-size: 17px;
    border-radius: 7px;
    letter-spacing: 0.5px;
    transition: background-color 300ms;
}
.link:hover {
    color: white;
    background-color: #59a66b;
}

</style>