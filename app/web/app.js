import angular from "angular";
import router from "ngcomponentrouter";
import ngMaterial from "angular-material";

import search from "./search/search";
import edit from "./edit/edit";
import common from "./common/common";
import top from "./top/top";
import view from "./view/view";

const APP_TEMPLATE = `
<div layout="column" layout-fill>
<top></top>
<md-content layout-padding>
	<ng-outlet></ng-outlet>
</md-content>
</div>
`;

angular.module("app", ["common", "search", "edit", "top", "view", "ngComponentRouter", "ngMaterial"])
	.config(($locationProvider) => {
		$locationProvider.html5Mode(true);
	})
	.component("app", {
		template: APP_TEMPLATE,
		$routeConfig: [
			{path: "/", name: "Home", component: "searchResult", useAsDefault: true},
			{path: "/edit/:recipeId", name: "Edit", component: "editRecipe"},
			{path: "/new", name: "New", component: "editRecipe"},
			{path: "/search", name: "Search", component: "searchResult"},
			{path: "/search/name/:name", name: "SearchByName", component: "searchResult"},
			{path: "/view/:recipeId", name: "View", component: "viewRecipe"},
		]
	})
	.value("$routerRootComponent", "app");