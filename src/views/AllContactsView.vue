<template>
	<div class="all-contacts">
		<h1>All Contacts</h1>

		<button @click="redirectToAdd" class="add-contact-btn">Add New Contact</button>

		<div v-if="contacts.length === 0" class="no-contacts">
			<p>No contacts found. Add your first contact!</p>
		</div>
		<ul v-else>
			<li v-for="contact in contacts" :key="contact.id">
				<ContactTemplate :contact="contact" />
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Contact } from "@/types/Contact";
import ContactTemplate from "@/components/ContactTemplate.vue";

export default defineComponent({
	name: "AllContactsView",
	components: { ContactTemplate },
	setup() {
		const router = useRouter();
		const contacts = ref<Contact[]>([]);

		onMounted(() => {
			const savedContacts = localStorage.getItem("contacts");
			if (savedContacts) {
				contacts.value = JSON.parse(savedContacts);
			}
		});

		const redirectToAdd = () => {
			router.push("/add-contact");
		};

		return { contacts, redirectToAdd };
	},
});
</script>

<style lang="scss">
.all-contacts {
	padding: 20px;
	background-color: #f8f9fa;

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
	.all-contacts {
		padding: 10px 15px;
	}
}

@media (min-width: 576px) and (max-width: 991px) {
	.all-contacts {
		padding: 15px 80px;
	}
}

@media (min-width: 992px) {
	.all-contacts {
		padding: 20px 160px;
	}
}
</style>
