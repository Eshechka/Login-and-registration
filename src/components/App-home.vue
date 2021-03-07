<template>
	<div class="home">
	<Appbtn
		:text="`Logout`"
		@btn-click="logoutUser"
	></Appbtn>
		<h1 class="home__title">HOME</h1>
	</div>
</template>

<script>
import Appbtn from './App-btn.vue'

export default {
	name: 'Home',
	components: {
		Appbtn
	},
	props: {
		
	},
	data() {
		return {


		}
	},
	methods: {
		logoutUser() {
			localStorage.setItem("isUserLogged", false);
			this.$router.push('/auth');
		},
	},
}
</script>

<style lang="postcss">

.home {

	&__title { 
		text-align: center;
	}
	@media screen and (max-width: 768px) {

	}
	@media screen and (max-width: 480px) {

	}

}

</style>
