import angular from "angular";

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

export default angular.module("top", []).component("top", {
	templateUrl: __dirname + "/top.html",
	controller: TopController
});