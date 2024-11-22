<template>
	<div id="app">
		<nav>
			<router-link to="/">All Contacts</router-link>
			<router-link to="/manage-contacts">Manage Contacts</router-link>
		</nav>
		<router-view />
	</div>
</template>

<style>
nav {
	display: flex;
	gap: 20px;
	margin-bottom: 20px;
	padding: 10px 20px;
	background-color: #f9f9f9;

	a {
		text-decoration: none;
		color: #080e2d;
		font-size: 18px;
		padding: 5px 10px;

		&:hover {
			background-color: #e8f0fe;
			color: #0056b3;
			transition:
				background-color 0.3s,
				color 0.3s;
		}
	}

	a.router-link-active {
		font-weight: bold;
		color: #0056b3;
		border-bottom: 2px solid #0056b3;
	}
}

@media (max-width: 575px) {
	nav {
		padding: 10px 15px;
	}
}

@media (min-width: 576px) and (max-width: 991px) {
	nav {
		padding: 15px 80px;
	}
}

@media (min-width: 992px) {
	nav {
		padding: 20px 160px;
	}
}
</style>
