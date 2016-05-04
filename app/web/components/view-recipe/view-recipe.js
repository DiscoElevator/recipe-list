import angular from "angular";

function ViewRecipeController(persistenceService, progressBarService) {
	this.recipe = {};

	this.$routerOnActivate = (next, previous) => {
		var id = next.params.recipeId;
		if (id) {
			progressBarService.show();
			return persistenceService.getRecipeById(id).then(recipe => {
				this.recipe = recipe;
				progressBarService.hide();
			});
		} else {
			this.recipe = {};
			return Promise.resolve();
		}
	};
}

export default angular.module("view-recipe", []).component("viewRecipe", {
	controller: ViewRecipeController,
	templateUrl: __dirname + "/view-recipe.html",
	bindings: {
		recipeId: "@"
	}
});