<template>
	<form class="form" 
		:id="id"
		@submit.prevent="$emit('form-submit')"
	>
		<h2 class="form__title">{{textTitle}}</h2>
		<slot name="inputs"></slot>
		<div class="form__extra"
			v-if="needExtra"
		>
			<slot name="extra"></slot>
		</div>
		<div class="form__btn">
			<Appbtn
				:textBtn="textBtn"
				:type="`submit`"
				:disabled=disabledBtn
				@btn-click="$emit('btn-click')"
			></Appbtn>
		</div>
	</form>
</template>

<script>
import Appbtn from './App-btn.vue'

export default {
  name: 'Form',
  components: { Appbtn },
  props: {
	id: String,
	textBtn: String,
	textTitle: String,
	needExtra: Boolean,
	disabledBtn: Boolean,
  },
  methods: {
  },
}
</script>

<style lang="postcss" scoped>

.form {
	background-color: #e9e9e9;
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding: 1rem 2rem;
	/* height: 100%; */
	text-align: center;

	@media screen and (max-width: 768px) {
		padding: 1rem 1.5rem;
	}
	@media screen and (max-width: 480px) {
		padding: 1rem;
	}

	&__title {
		font-weight: 300;
		margin: 0;
		margin-bottom: 1.25rem;
		margin-top: 1rem;

		@media screen and (max-width: 480px) {
			margin-top: 0.5rem;
			margin-bottom: 0.5rem;
		}
	}
	&__btn {
		margin-top: 1.5rem;
	}
}

</style>
