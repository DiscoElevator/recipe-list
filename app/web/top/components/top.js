function TopController($rootRouter) {
	this.searchQuery = "";
	this.search = () => {
		if (!this.searchQuery) {
			return;
		}
		let query = this.searchQuery;
		this.searchQuery = "";
		$rootRouter.navigate(["Search", {name: query}]);
	};
}

export default {
	name: "top",
	component: {
		templateUrl: __dirname + "/top.html",
		controller: TopController
	}
};