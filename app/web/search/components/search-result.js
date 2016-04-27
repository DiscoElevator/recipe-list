function SearchResultController(persistenceService, progressBarService) {
	this.items = [];

	this.$routerOnActivate = (next) => {
		let name = next.params.name;
		progressBarService.show();
		if (name) {
			return persistenceService.getByName(name).then(results => {
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

export default {
	name: "searchResult",
	component: {
		controller: SearchResultController,
		templateUrl: __dirname + "/search-result.html",
		bindings: {
			$router: "<"
		}
	}
};