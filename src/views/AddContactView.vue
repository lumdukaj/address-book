<template>
	<div class="add-contact">
		<h1>Add Contact</h1>

		<form @submit.prevent="handleSubmit">
			<div class="form-inputs">
				<label for="firstName">First Name</label>
				<input type="text" id="firstName" v-model="contact.firstName" required />
			</div>

			<div class="form-inputs">
				<label for="lastName">Last Name</label>
				<input type="text" id="lastName" v-model="contact.lastName" required />
			</div>

			<div class="form-inputs">
				<label for="email">Email</label>
				<input type="email" id="email" v-model="contact.email" required />
			</div>

			<div class="form-inputs">
				<label for="country">Country</label>
				<select id="country" v-model="contact.country" required>
					<option v-for="country in countries" :key="country" :value="country">
						{{ country }}
					</option>
				</select>
			</div>

			<button :disabled="!isValid" type="submit">Add Contact</button>
		</form>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { getNames } from "country-list";
import { Contact } from "@/types/Contact";

const router = useRouter();

const countries = getNames();
countries.push("Kosovo");
countries.sort();

const contact = reactive<Contact>({
	id: Date.now(),
	firstName: "",
	lastName: "",
	email: "",
	country: "",
});

const isValid = computed(() => {
	return !(Object.keys(contact) as (keyof typeof contact)[]).some((key) => !contact[key]);
});

const handleSubmit = () => {
	const savedContacts = localStorage.getItem("contacts");
	const contacts = savedContacts ? JSON.parse(savedContacts) : [];
	contacts.unshift({ ...contact, id: Date.now() });
	localStorage.setItem("contacts", JSON.stringify(contacts));
	router.push("/");
};
</script>

<style lang="scss" scoped>
.add-contact {
	padding: 25px;
	background-color: #f8f9fa;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	max-width: 500px;
	margin: 0 auto;

	.form-inputs {
		margin-bottom: 20px;

		label {
			display: block;
			margin-bottom: 8px;
			font-weight: bold;
			color: #333;
		}

		input,
		select {
			box-sizing: border-box;
			width: 100%;
			padding: 10px;
			font-size: 16px;
			border: 1px solid #ccc;
			border-radius: 6px;
			background-color: #fff;
			transition: border-color 0.2s ease-in-out;

			&:focus {
				border-color: #7cacf8;
				outline: none;
			}
		}
	}

	button {
		padding: 12px 25px;
		font-size: 16px;
		font-weight: bold;
		color: #fff;
		background-color: #0056b3;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;

		&[disabled] {
			opacity: 0.5;
			pointer-events: none;
		}

		&:hover {
			background-color: #004494;
		}

		&:active {
			transform: translateY(0);
		}
	}
}
</style>
