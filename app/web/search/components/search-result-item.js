function SearchResultItemController(persistenceService) {
	this.editRecipe = (id) => {
		var instruction = this.router.generate(["Edit", {recipeId: String(id)}]);
		this.router.navigateByInstruction(instruction);
	};
	this.viewRecipe = (id) => {
		var instruction = this.router.generate(["View", {recipeId: String(id)}]);
		this.router.navigateByInstruction(instruction);
	};
	this.removeRecipe = (id) => {
		persistenceService.remove(id).then(() => {
			this.onRemove();
		});
	};
}

export default {
	name: "searchResultItem",
	component: {
		controller: SearchResultItemController,
		templateUrl: __dirname + "/search-result-item.html",
		bindings: {
			item: "<",
			router: "<",
			onRemove: "&"
		}
	}
};