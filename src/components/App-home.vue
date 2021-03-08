<template>
	<div class="home">
		<div class="home__btn">
			<Appbtn
				:textBtn="`Logout`"
				@btn-click="logoutUser"
			></Appbtn>
		</div>
		<h1 class="home__title">HOME</h1>
		<div class="home__user">
			<div class="user">
				<div class="user__firstname">Firstname: {{user.firstname}}</div>
				<div class="user__lastname">Lastname: {{user.lastname}}</div>
				<div class="user__login">Login: {{user.login}}</div>
			</div>
		</div>

		<ValidationObserver v-slot="{ invalid }" tag="div">
			<Appform
				:id="'review-form'"
				:textTitle="'Review'"
				:textBtn="'OK'"
				:needExtra="false"
				:disabledBtn="invalid"
				@btn-click="addReviewHandle()"
			>
				<template v-slot:inputs>
					<ValidationProvider rules="required|minmax:2,30" v-slot="{ errors }" tag="div">
						<Appinput
							:placehldr="`О чём отзыв`"
							:value="review.subject"
							@input="(text) => review.subject = text">
						</Appinput>
						<div class="home__error-msg">{{ errors[0] }}</div>
					</ValidationProvider>
					<ValidationProvider rules="required|minmax:8,500" v-slot="{ errors }" tag="div">
						<textarea class="home__textarea"
							rows="10" 
							placeholder="Текст отзыва"
							v-model="review.text"
						></textarea>
						<div class="home__error-msg">{{ errors[0] }}</div>
					</ValidationProvider>
				</template>

			</Appform>
		</ValidationObserver>

		<div class="home__reviews">
			<ul class="reviews"
				v-if="reviews.length"
			>
				<li class="reviews__item"
					v-for="(review, ndx) in reviews"
					:key="ndx"
				>
					<div class="reviews__subject">{{review.subject}}</div>
					<div class="reviews__text">{{review.text}}</div>
				</li>
			</ul>
			<div class="reviews__noitems"
				v-if="!reviews.length"
			>No reviews yet...</div>
		</div>
	</div>
</template>

<script>
import Appbtn from './App-btn.vue'
import Appform from './App-form.vue'
import Appinput from './App-input.vue'

import { ValidationProvider } from 'vee-validate'
import { ValidationObserver } from 'vee-validate'

import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'


extend('required', {
  ...required,
  message: 'Поле должно быть заполнено'
});

extend('minmax', {
	validate(value, args) {
		return value.length >= args.min && value.length < args.max;
	},
	params: ['min', 'max'],
	message: 'Отзыв должен содержать от {min} до {max} символов'
})

export default {
	name: 'Home',
	components: {
		Appbtn,
		Appform,
		Appinput,
		ValidationProvider,
		ValidationObserver
	},
	props: {
		
	},
	data() {
		return {
			user: {
				firstname: '',
				lastname: '',
				login: '',
			},
			review: {
				subject: '',
				text: '',
			},
			reviews: [],
		}
	},
	methods: {
		logoutUser() {
			localStorage.setItem("isUserLogged", false);
			this.$router.push('/auth');
		},
		addReviewHandle() {
			const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
			allReviews.push(this.review);

			localStorage.setItem("reviews", JSON.stringify(allReviews));
			this.reviews = allReviews;

			this.review = { subject: '', text: ''};
		},
	},
	created() {
		const user = localStorage.getItem("user");
		if (user) {
			this.user = JSON.parse(user);
		}
		this.reviews = JSON.parse(localStorage.getItem("reviews")) || [];
	},
}
</script>

<style lang="postcss">

.home {
	display: flex;
	flex-direction: column;
	background-color: rgba(#e9e9e9, 0.7);
	border-radius: 10px;
	box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
		0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
	padding: 10px;
	max-width: 748px;
	width: 60%;
	overflow: hidden;

	&__title { 
		text-align: center;
	}
	@media screen and (max-width: 768px) {

	}
	@media screen and (max-width: 480px) {

	}

	&__btn {
		align-self: flex-end;
	}

	&__error-msg {
		font-size: 12px;
		color: rgb(134, 61, 61);
		margin-top: -5px;
		min-height: 15px;
	}
	&__reviews {
		height: 220px;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	&__textarea {
		width: 100%;
		max-width: 748px;
		border: none;
		resize: none;
		box-sizing: border-box;
			padding: 0.7rem 0.9rem;
		margin: 0.4rem 0;

		@media screen and (max-width: 480px) {
			margin-top: 0.2rem;
		}
	}
}

.user {
	padding-top: 10px;
	padding-bottom: 10px;
}

.reviews {
	max-width: 748px;
	background-color: #e9e9e9;
	margin-block-start: 0;
	margin-block-end: 0;
	margin-inline-start: 0px;
	margin-inline-end: 0px;
	padding-inline-start: 0px;
	padding: 1rem 2rem;
	overflow-y: scroll;
	height: 200px;

	&__item {
		background-color: #ddd;
		list-style: none;
		margin-top: 10px;
		margin-bottom: 10px;
		padding: 10px;
	}
	&__noitems {
		color: #fff;
		text-align: center;
		font-size: 30px;
		margin-top: 20px;
	}
}

</style>
