import angular from "angular";
import searchResultItem from "./search-result-item/search-result-item";

function SearchResultController(persistenceService, progressBarService) {
	this.items = [];

	this.$routerOnActivate = (next) => {
		let name = next.params.name;
		progressBarService.show();
		if (name) {
			return persistenceService.getRecipeByName(name).then(results => {
				this.items = results;
				progressBarService.hide();
			});
		} else {
			return persistenceService.getAll().then(results => {
				this.items = results;
				progressBarService.hide();
			});
		}
	};
}

export default angular.module("search-result", ["search-result-item"]).component("searchResult", {
	controller: SearchResultController,
	templateUrl: __dirname + "/search-result.html",
	bindings: {
		$router: "<"
	}
});