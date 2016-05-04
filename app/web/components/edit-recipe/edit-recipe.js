import angular from "angular";

function EditRecipeController(persistenceService, progressBarService) {
	this.save = () => {
		if (!validate(this.recipe)) {
			return;
		}
		progressBarService.show();
		let recipeToSave = JSON.parse(angular.toJson(this.recipe));
		persistenceService.saveRecipe(recipeToSave).then(() => {
			progressBarService.hide();
		}).catch(err => {
			console.error(err);
		});
		this.reset();
	};

	this.remove = () => {
		if (!this.recipe._id) {
			return;
		}
		progressBarService.show();
		persistenceService.remove(this.recipe._id).then(() => {
			this.reset();
			progressBarService.hide();
		}).catch(err => {
			console.error(err);
		});
	};

	this.addIngredient = () => {
		if (this.ingredient.name && this.ingredient.count) {
			this.recipe.ingredients.push(this.ingredient);
			this.ingredient = {};
		}
	};

	this.$routerOnActivate = (next, previous) => {
		var id = next.params.recipeId;
		if (id) {
			progressBarService.show();
			return persistenceService.getRecipeById(id).then(recipe => {
				this.recipe = recipe;
				progressBarService.hide();
			}).catch(err => {
				console.error(err);
			});
		} else {
			this.reset();
			return Promise.resolve();
		}
	};
	this.reset = () => {
		this.recipe = {
			ingredients: []
		};
	};
}

function validate(recipe) {
	return recipe && recipe.name && recipe.process && (recipe.ingredients && recipe.ingredients.length);
}

export default angular.module("edit-recipe", []).component("editRecipe", {
	controller: EditRecipeController,
	templateUrl: __dirname + "/edit-recipe.html"
});