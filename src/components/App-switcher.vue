<template>
	<div class="switcher"
		:class="{
			'switcher_right-active': isRightActive,
		}"
	>
		<div class="switcher__element switcher__element_one">
			<ValidationObserver 
				v-slot="{ invalid }" 
				tag="div"
				class="switcher__form-wrapper"
				>
				<Appform
					:id="'registration-form'"
					:textBtn="'Register'"
					:textTitle="'Registration'"
					:needExtra="false"
					:disabledBtn="invalid"
					@btn-click="registrationHandle"
				>
					<template v-slot:inputs>
						<ValidationProvider rules="minmax:3,20|required" v-slot="{ errors }" tag="div">
							<Appinput
								:placehldr="`First name`"
								:value="regUser.firstname"
								@input="(text) => regUser.firstname = text">
							</Appinput>
							<div class="switcher__error-msg">{{ errors[0] }}</div>
						</ValidationProvider>

						<ValidationProvider rules="minmax:3,30|required" v-slot="{ errors }" tag="div">
							<Appinput
								:placehldr="`First name`"
								:value="regUser.lastname"
								@input="(text) => regUser.lastname = text">
							</Appinput>
							<div class="switcher__error-msg">{{ errors[0] }}</div>
						</ValidationProvider>

						<ValidationProvider rules="minmax:3,30|required" v-slot="{ errors }" tag="div">
							<Appinput
								:placehldr="`Login`"
								:value="regUser.login"
								@input="(text) => regUser.login = text">
							</Appinput>
							<div class="switcher__error-msg">{{ errors[0] }}</div>
						</ValidationProvider>

						<ValidationProvider rules="email|required" v-slot="{ errors }" tag="div">
							<Appinput
								:placehldr="`Email`"
								:value="regUser.email"
								:type="`email`"
								@input="(text) => regUser.email = text">
							</Appinput>
							<div class="switcher__error-msg">{{ errors[0] }}</div>
						</ValidationProvider>

						<ValidationProvider rules="minmax:8,30|required" v-slot="{ errors }" tag="div">
							<Appinput
								:placehldr="`Password`"
								:value="regUser.password"
								:type="`password`"
								@input="(text) => regUser.password = text">
							</Appinput>
							<div class="switcher__error-msg">{{ errors[0] }}</div>
						</ValidationProvider>

						<ValidationProvider rules="minmax:8,30|required" v-slot="{ errors }" tag="div">
							<Appinput
								:placehldr="`Password confirmation`"
								:value="regUser.password_confirmation"
								:type="`password`"
								@input="(text) => regUser.password_confirmation = text">
							</Appinput>
							<div class="switcher__error-msg">{{ errors[0] }}</div>
						</ValidationProvider>
					</template>
				</Appform>
			</ValidationObserver>
		</div>        
		
		<div class="switcher__element switcher__element_two">
			<ValidationObserver 
				v-slot="{ invalid }" 
				tag="div"
				class="switcher__form-wrapper"
				>
				<Appform
					:id="'login-form'"
					:textBtn="'Login'"
					:textTitle="'Login'"
					:needExtra="true"
					:disabledBtn="invalid"
					@btn-click="loginHandle"
				>
					<template v-slot:inputs>
						<ValidationProvider rules="email|required" v-slot="{ errors }" tag="div">
							<Appinput
								:placehldr="`Email`"
								:value="logUser.email"
								:type="`email`"
								@input="(text) => logUser.email = text">
							</Appinput>
							<div class="switcher__error-msg">{{ errors[0] }}</div>
						</ValidationProvider>
						<ValidationProvider rules="minmax:8,30|required" v-slot="{ errors }" tag="div">
							<Appinput
								:placehldr="`Password`"
								:value="logUser.password"
								:type="`password`"
								@input="(text) => logUser.password = text">
							</Appinput>
							<div class="switcher__error-msg">{{ errors[0] }}</div>
						</ValidationProvider>
						<!-- <a href="#" class="form__link">Forgot your password?</a> -->
					</template>
					<template v-slot:extra>
						<div class="toggler">
							<div class="toggler__container">
								<input class="toggler__input" type="checkbox" value="None" id="toggler" name="check" checked />
								<label class="toggler__switch" for="toggler"
									@click="toggleClick"
								></label>
							</div>
							<span class="toggler__text">Remember me</span>
						</div>
					</template>

				</Appform>
			</ValidationObserver>
		</div>

		<div class="switcher__overlay-wrapper">
			<div class="switcher__overlay">
				<div class="switcher__overlay-panel switcher__overlay-panel_left">
					<Appbtn
						:textBtn="` To registration`"
						@btn-click="rightActiveToggle"
					></Appbtn>
				</div>
				<div class="switcher__overlay-panel switcher__overlay-panel_right">
					<Appbtn
						:textBtn="`To login`"
						@btn-click="rightActiveToggle"
					></Appbtn>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Appform from './App-form.vue'
import Appbtn from './App-btn.vue'
import Appinput from './App-input.vue'

import { ValidationProvider } from 'vee-validate'
import { ValidationObserver } from 'vee-validate'

import { extend } from 'vee-validate'
import { email,required } from 'vee-validate/dist/rules'


extend('required', {
  ...required,
  message: 'Поле должно быть заполнено'
});
extend('email', {
  ...email,
  message: 'Некорректный email'
});

extend('minmax', {
	validate(value, args) {
		return value.length >= args.min && value.length < args.max;
	},
	params: ['min', 'max'],
	message: 'Поле должно содержать от {min} до {max} символов'
})

export default {
	name: 'App-switcher',
	components: { 
		Appform, 
		Appbtn, 
		Appinput, 
		ValidationProvider,
		ValidationObserver
		},
	props: {
		
	},
	data() {
		return {
			isRightActive: true,
			regUser: {
				firstname: '',
				lastname: '',
				login: '',
				email: '',
				password: '',
				password_confirmation: '',
			},
			logUser: {
				email: '',
				password: '',
			},
			rememberMe: true,
		}
	},
	methods: {
		rightActiveToggle() {
			this.isRightActive = !this.isRightActive;
		},
		toggleClick() {
			this.rememberMe = !this.rememberMe;
		},
		loginHandle() {
			const user = localStorage.getItem("user");
			if (user) {
				const {email, password} = JSON.parse(user);
				if (email===this.logUser.email && password===this.logUser.password) {
					localStorage.setItem("isUserLogged", true);
				}
			}
			
			this.$router.push('/');
		},
		registrationHandle() {
			localStorage.setItem("user", JSON.stringify(this.regUser));
		},
	},
}
</script>

<style lang="postcss">

.switcher {
  background-color: #e9e9e9;
  border-radius: 10px;
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: 550px;
  max-width: 748px;
  overflow: hidden;
  position: relative;
  width: 100%;


	@media screen and (max-width: 768px) {
		max-width: unset;
		width: 90%;
		height: 600px;
	}

	&__element {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		transition: all 0.6s ease-in-out;

		&_one {
			left: 0;
			width: 50%;
			z-index: 2;
		}
		&_two {
			left: 0;
			opacity: 0;
			width: 50%;
			z-index: 1;
		}

		@media screen and (max-width: 768px) {
			height: 600px;
		}
		@media screen and (max-width: 480px) {
			width: 100%;
			top: 100px;
			height: 500px;
		}
	}

	&__overlay-wrapper {
		position: absolute;
		top: 0;
		left: 50%;
		height: 100%;
		width: 50%;
		overflow: hidden;
		transition: transform 0.6s ease-in-out;
		z-index: 100;

		@media screen and (max-width: 480px) {
			height: 100px;
			width: 100%;
			left: 0;
		}
	}

	&__overlay {
		background-color: #008997;
		background: url("../assets/bg.jpg");
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		height: 100%;
		width: 200%;
		position: relative;
		left: -100%;
		transform: translateX(0);
		transition: transform 0.6s ease-in-out;

		@media screen and (max-width: 480px) {
			background: none;
			background-color: aliceblue;
		}
	}

	&__overlay-panel {
		align-items: center;
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		position: absolute;
		text-align: center;
		top: 0;
		transform: translateX(0);
		transition: transform 0.6s ease-in-out;
		width: 50%;

		@media screen and (max-width: 480px) {
			height: 100px;
		}

		&_right {
			right: 0;
			transform: translateX(0);
		}		
	}

	&_right-active {
		& .switcher__element_one {
			transform: translateX(100%);
			opacity: 0;
		}
		& .switcher__element_two {
			animation: show 0.6s;
			opacity: 1;
			transform: translateX(100%);
			z-index: 5;

			@media screen and (max-width: 480px) {
				transform: translateX(0);
				animation: show-mobile 0.6s;
			}
		}
		& .switcher__overlay-wrapper {
			transform: translateX(-100%);
				@media screen and (max-width: 480px) {
					transform: translateX(0);
				}
		}
		& .switcher__overlay {
			transform: translateX(50%);
		}
	}

	&__error-msg {
		font-size: 12px;
		color: rgb(134, 61, 61);
		margin-top: -5px;
		min-height: 15px;
	}

	&__form-wrapper {
		width: 100%;
	}
}

@keyframes show {
	0%,
	49.99% {
		opacity: 0;
		z-index: 1;
	}

	50%,
	100% {
		opacity: 1;
		z-index: 5;
	}
}
@keyframes show-mobile {
	0%{
		opacity: 0;
		z-index: 1;
	}

	100% {
		opacity: 1;
		z-index: 5;
	}
}

.toggler {
	display: flex;
	align-items: center;

	&__container {
		width: 75px;
		height: 26px;
		background: #333;
		margin: 20px 0;
		position: relative;
		border-radius: 50px;
		box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,0.2);
			&:after {
				content: 'OFF';
				color: #000;
				position: absolute;
				right: 10px;
				z-index: 0;
				font: 12px/26px Arial, sans-serif;
				font-weight: bold;
				text-shadow: 1px 1px 0px rgba(255,255,255,.15);
			}
			&:before {
				content: 'ON';
				color: #0367a6;
				position: absolute;
				left: 10px;
				z-index: 0;
				font: 12px/26px Arial, sans-serif;
				font-weight: bold;
			}
	}
	&__switch {
		display: block;
		width: 34px;
		height: 20px;
		cursor: pointer;
		position: absolute;
		top: 3px;
		left: 3px;
		z-index: 1;
		background-color: #0367a6;
		background-image: linear-gradient(90deg, #0367a6 0%, #008997 74%);
		border-radius: 50px;
		transition: all 0.4s ease;
		box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.3);
	}
	&__input[type=checkbox] {
		visibility: hidden;
		&:checked + label {
		left: 38px;
		}
	}
	&__text {
		margin-left: 10px;

		@media screen and (max-width: 768px) {
			font-size: 12px;
		}
	}
}
</style>
