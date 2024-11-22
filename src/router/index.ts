import { createRouter, createWebHistory } from 'vue-router';
import AllContactsView from '@/views/AllContactsView.vue';
import AddContactView from '@/views/AddContactView.vue';
import ManageContactsView from '@/views/ManageContactsView.vue';

const routes = [
  {
    path: '/',
    name: 'AllContacts',
    component: AllContactsView,
  },
  {
    path: '/add-contact',
    name: 'AddContact',
    component: AddContactView,
  },
  {
    path: '/manage-contacts',
    name: 'ManageContacts',
    component: ManageContactsView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
