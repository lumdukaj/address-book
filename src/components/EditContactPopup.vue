<template>
	<div class="popup-container">
		<div class="popup">
			<h2>Edit Contact</h2>

			<div v-if="showError" class="error-message">
				{{ displayMessage }}
			</div>

			<form @submit.prevent="confirmEdit">
				<div class="form-group">
					<label for="firstName">First Name</label>
					<input type="text" id="firstName" v-model="editedContact.firstName" />
				</div>

				<div class="form-group">
					<label for="lastName">Last Name</label>
					<input type="text" id="lastName" v-model="editedContact.lastName" required />
				</div>

				<div class="form-group">
					<label for="email">Email</label>
					<input type="email" id="email" v-model="editedContact.email" required />
				</div>

				<div class="form-group">
					<label for="country">Country</label>
					<select id="country" v-model="editedContact.country" required>
						<option v-for="country in countries" :key="country" :value="country">
							{{ country }}
						</option>
					</select>
				</div>

				<div class="save-actions">
					<button type="submit" :disabled="!isModified" class="confirm-btn">Save</button>
					<button type="button" @click="cancelEdit" class="cancel-btn">Cancel</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, computed } from "vue";
import { Contact } from "@/types/Contact";
import { getNames } from "country-list";

const props = defineProps<{
	contact: Contact | null;
	errorMessage: string;
	showError: boolean;
}>();

const emit = defineEmits<{
	(event: "confirm", contact: Contact): void;
	(event: "cancel"): void;
	(event: "update:errorMessage", errorMessage: string): void;
	(event: "update:showError", showError: boolean): void;
}>();

const countries = getNames();
countries.push("Kosovo");
countries.sort();

const editedContact = ref<Contact>(
	props.contact
		? { ...props.contact }
		: {
				id: 0,
				firstName: "",
				lastName: "",
				email: "",
				country: "",
			}
);

const isModified = computed(() => {
	if (!props.contact || !editedContact.value) {
		return false;
	}

	return (
		props.contact.firstName !== editedContact.value.firstName ||
		props.contact.lastName !== editedContact.value.lastName ||
		props.contact.email !== editedContact.value.email ||
		props.contact.country !== editedContact.value.country
	);
});

const displayMessage = computed(() => {
	return props.errorMessage.trim() || "An error has occurred, please try again";
});

const confirmEdit = () => {
	if (editedContact.value) {
		emit("confirm", editedContact.value);
	}
};

const cancelEdit = () => {
	emit("cancel");
	resetErrorMessage();
};

const resetErrorMessage = () => {
	emit("update:errorMessage", "");
	emit("update:showError", false);
};
</script>

<style scoped lang="scss">
.popup-container {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.popup {
	background: white;
	padding: 25px;
	border-radius: 10px;
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
	width: 420px;
	text-align: center;
	animation: fadeIn 0.2s ease-in-out;

	h2 {
		font-size: 1.8em;
		margin-bottom: 20px;
		color: #080e2d;
	}
}

.form-group {
	margin-bottom: 20px;

	label {
		display: block;
		margin-bottom: 8px;
		font-weight: bold;
		color: #333333;
	}

	input,
	select {
		box-sizing: border-box;
		width: 100%;
		padding: 10px;
		font-size: 16px;
		border: 1px solid #cccccc;
		border-radius: 6px;
		background-color: #f9f9f9;
		transition: border-color 0.2s ease-in-out;

		&:focus {
			border-color: #7cacf8;
			outline: none;
		}
	}
}

.save-actions {
	display: flex;
	justify-content: space-between;
	margin-top: 25px;

	button {
		padding: 12px 20px;
		border: none;
		border-radius: 6px;
		font-size: 1em;
		cursor: pointer;
		transition: opacity 0.2s ease-in-out;

		&.confirm-btn {
			background-color: #0056b3;
			color: white;

			&[disabled] {
				opacity: 0.5;
				pointer-events: none;
			}
		}

		&.cancel-btn {
			background-color: #6c757d;
			color: white;
		}

		&:hover {
			opacity: 0.8;
		}
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: scale(0.95);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
}
</style>
