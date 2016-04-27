const TEMPLATE = `
<md-dialog aria-label="progress">
	<div layout="row" layout-sm="column" layout-align="space-around">
		<md-progress-circular md-diameter="100" md-mode="indeterminate"></md-progress-circular>
	</div>
</md-dialog>
`;

function progressBarService($mdDialog) {
	return {
		show() {
			$mdDialog.show({
				parent: angular.element(document.body),
				clickOutsideToClose: false,
				fullscreen: true,
				template: TEMPLATE
			});

		},
		hide() {
			$mdDialog.hide();
		}
	};
}

export default {
	name: "progressBarService",
	fn: progressBarService
};