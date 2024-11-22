<template>
	<div class="popup-container">
		<div class="popup">
			<h2>Confirm Delete</h2>
			<p>Are you sure you want to delete this contact?</p>
			<div class="contact-info">
				<p><strong>Name:</strong> {{ contact?.firstName || "" }} {{ contact?.lastName || "" }}</p>
				<p><strong>Email:</strong> {{ contact?.email || "" }}</p>
				<p><strong>Country:</strong> {{ contact?.country || "" }}</p>
			</div>

			<div v-if="showError" class="error-message">
				{{ displayMessage }}
			</div>

			<div class="delete-actions">
				<button @click="confirmDelete" class="confirm-btn">Confirm</button>
				<button @click="cancelDelete" class="cancel-btn">Cancel</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Contact } from "@/types/Contact";

export default defineComponent({
	name: "DeleteContactPopup",
	props: {
		contact: {
			type: Object as PropType<Contact | null>,
			required: false,
		},
		errorMessage: {
			type: String,
			default: "An error has occurred, please try again",
			required: false,
		},
		showError: {
			type: Boolean,
			default: false,
		},
	},

	setup(props) {
		const displayMessage = computed(() => {
			return props.errorMessage.trim() || "An error has occurred, please try again";
		});

		return { displayMessage };
	},
	emits: ["confirm", "cancel", "update:errorMessage", "update:showError"],
	methods: {
		confirmDelete() {
			this.$emit("confirm");
		},
		cancelDelete() {
			this.$emit("cancel");
			this.resetErrorMessage();
		},
		resetErrorMessage() {
			this.$emit("update:errorMessage", "");
			this.$emit("update:showError", false);
		},
	},
});
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

.contact-info {
	margin: 15px 0;
	text-align: left;

	p {
		margin: 5px 0;
		color: #555555;
	}
}

.delete-actions {
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
			background-color: #dc3545;
			color: white;
		}

		&.cancel-btn {
			background-color: #6c757d;
			color: white;
		}

		&:hover {
			opacity: 0.9;
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
