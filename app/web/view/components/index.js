import angular from "angular";

import declare from "../../util/declare";

const bulk = require("bulk-require");
const componentsModule = angular.module("view.components", []);
const components = bulk(__dirname, ["./**/!(*index|*.spec).js"]);

declare("component", components, componentsModule);

export default componentsModule;