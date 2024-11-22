<template>
	<div class="contact-template">
		<div class="contact-info">
			<strong>{{ contact.firstName }} {{ contact.lastName }}</strong>
			<p>{{ contact.email }}</p>
			<p>{{ contact.country }}</p>
		</div>
		<div v-if="showActions" class="contact-actions">
			<button class="edit-btn" @click="editContact">Edit</button>
			<button class="delete-btn" @click="deleteContact">Delete</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Contact } from "@/types/Contact";

export default defineComponent({
	name: "ContactTemplate",
	props: {
		contact: {
			type: Object as PropType<Contact>,
			required: true,
		},
		showActions: {
			type: Boolean,
			default: false,
		},
	},
	emits: ["edit", "delete"],
	methods: {
		editContact() {
			this.$emit("edit", this.contact);
		},
		deleteContact() {
			this.$emit("delete", this.contact);
		},
	},
});
</script>

<style lang="scss" scoped>
.contact-template {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	min-width: 350px;
	border: 1px solid #ddd;
	border-radius: 8px;
	background-color: #ffffff;
	margin-bottom: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	.contact-info {
		flex: 1;

		strong {
			font-size: 1.2em;
			display: block;
			color: #080e2d;
		}

		p {
			margin: 5px 0;
			color: #555555;
		}
	}

	.contact-actions {
		display: flex;
		gap: 10px;

		button {
			padding: 5px 10px;
			border: none;
			border-radius: 4px;
			cursor: pointer;
			font-size: 1em;
			color: #ffffff;
			transition: opacity 0.2s ease-in-out;

			&.edit-btn {
				background-color: #0056b3;
			}

			&.delete-btn {
				background-color: #dc3545;
			}

			&:hover {
				opacity: 0.9;
			}
		}
	}
}
</style>
