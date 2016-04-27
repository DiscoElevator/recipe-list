function EditRecipeController(persistenceService, progressBarService) {
	this.save = () => {
		if (!validate(this.recipe)) {
			return;
		}
		progressBarService.show();
		let recipeToSave = Object.assign({}, this.recipe);
		recipeToSave.ingredients = JSON.parse(angular.toJson(this.recipe.ingredients));
		persistenceService.saveRecipe(recipeToSave).then(() => {
			progressBarService.hide();
		}).catch(err => {
			console.log(err);
		});
		this.reset();
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
	return recipe && recipe.name && recipe.process;
}

const editRecipe = {
	controller: EditRecipeController,
	templateUrl: __dirname + "/edit-recipe.html"
};

export default {
	name: "editRecipe",
	component: editRecipe
};