import angular from "angular";
import declare from "../../util/declare";

const bulk = require("bulk-require");
const servicesModule = angular.module("common.services", []);
const services = bulk(__dirname, ["./**/!(*index|*.spec).js"]);

declare("factory", services, servicesModule);

export default servicesModule;