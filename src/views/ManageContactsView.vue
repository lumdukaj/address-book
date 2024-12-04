<template>
	<div class="manage-contacts">
		<h1>Manage Contacts</h1>

		<button @click="redirectToAdd" class="add-contact-btn">Add New Contact</button>

		<div v-if="contacts.length === 0" class="no-contacts">
			<p>No contacts to manage. Add your first contact!</p>
		</div>

		<ul v-else>
			<li v-for="contact in contacts" :key="contact.id">
				<ContactTemplate
					:contact="contact"
					showActions
					@edit="showPopup(contact, 'edit')"
					@delete="showPopup(contact, 'delete')"
				/>
			</li>
		</ul>

		<DeleteContactPopup
			v-if="isDeletePopupVisible"
			:contact="selectedContact"
			v-model:showError="showPopupError"
			v-model:errorMessage="popupErrorMessage"
			@confirm="confirmDelete"
			@cancel="closePopup('delete')"
		/>

		<EditContactPopup
			v-if="isEditPopupVisible"
			:contact="selectedContact"
			v-model:showError="showPopupError"
			v-model:errorMessage="popupErrorMessage"
			@confirm="confirmEdit"
			@cancel="closePopup('edit')"
		/>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { Contact } from "@/types/Contact";
import DeleteContactPopup from "@/components/DeleteContactPopup.vue";
import EditContactPopup from "@/components/EditContactPopup.vue";
import ContactTemplate from "@/components/ContactTemplate.vue";

const router = useRouter();
const contacts = ref<Contact[]>(JSON.parse(localStorage.getItem("contacts") || "[]"));
const selectedContact = ref<Contact | null>(null);
const isDeletePopupVisible = ref(false);
const isEditPopupVisible = ref(false);
const popupErrorMessage = ref<string>("");
const showPopupError = ref<boolean>(false);

const showPopup = (contact: Contact | null, type: string) => {
	selectedContact.value = contact;
	if (type === "delete") {
		isDeletePopupVisible.value = true;
	} else if (type === "edit") {
		isEditPopupVisible.value = true;
	}
};

const closePopup = (type: string) => {
	selectedContact.value = null;
	if (type === "delete") {
		isDeletePopupVisible.value = false;
	} else if (type === "edit") {
		isEditPopupVisible.value = false;
	}
};

const confirmDelete = () => {
	try {
		if (!selectedContact.value) {
			throw new Error("No contact selected.");
		}

		contacts.value = contacts.value.filter((contact) => contact.id !== selectedContact.value?.id);
		localStorage.setItem("contacts", JSON.stringify(contacts.value));

		closePopup("delete");
	} catch (error) {
		popupErrorMessage.value =
			"An error occurred while trying to delete the contact. Please try again.";
		showPopupError.value = true;
	}
};

const confirmEdit = (updatedContact: Contact) => {
	try {
		if (!selectedContact.value) {
			throw new Error("No contact selected.");
		}

		const index = contacts.value.findIndex((c) => c.id === updatedContact.id);
		if (index !== -1) {
			contacts.value[index] = updatedContact;
			localStorage.setItem("contacts", JSON.stringify(contacts.value));
		}

		closePopup("edit");
	} catch (error) {
		popupErrorMessage.value =
			"An error occurred while trying to edit the contact. Please try again.";
		showPopupError.value = true;
	}
};

const redirectToAdd = () => {
	router.push("/add-contact");
};
</script>

<style scoped lang="scss">
.manage-contacts {
	padding: 20px;
	background-color: #f4f5f7;

	h1 {
		font-size: 34px;
		margin-bottom: 20px;
		color: #080e2d;
	}

	.add-contact-btn {
		background-color: #0056b3;
		color: white;
		padding: 10px 15px;
		border: none;
		border-radius: 4px;
		font-size: 1em;
		cursor: pointer;
		margin-bottom: 20px;
		transition: background-color 0.2s ease-in-out;

		&:hover {
			background-color: #004494;
		}
	}

	.no-contacts {
		font-size: 1.2em;
		color: gray;
		text-align: center;
		margin-top: 20px;
	}

	ul {
		list-style: none;
		padding: 0;
	}
}

@media (max-width: 575px) {
	.manage-contacts {
		padding: 10px 15px;
	}
}

@media (min-width: 576px) and (max-width: 991px) {
	.manage-contacts {
		padding: 15px 80px;
	}
}

@media (min-width: 992px) {
	.manage-contacts {
		padding: 20px 160px;
	}
}
</style>
