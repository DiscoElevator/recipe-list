import Datastore from "nedb";
import Bluebird from "bluebird";

const TEST_DB = [{
	name: "Test 1",
	time: "40 years",
	process: "Lorem ipsum dolor sit amet, ne quod novum mei. Sea omnium invenire mediocrem at, in lobortis conclusionemque nam. Ne deleniti appetere reprimique pro, inani labitur disputationi te sed. At vix sale omnesque, id pro labitur reformidans accommodare, cum labores honestatis eu. Nec quem lucilius in, eam praesent reformidans no. Sed laudem aliquam ne.",
	ingredients: [{
		name: "first",
		count: "many"
	}]
}];

function persistenceService($q) {
	let db = new Datastore();
	promisify(db);
	db.insert(TEST_DB[0]);
	return {
		getAll() {
			return $q.when(db.findAsync({}));
		},
		getRecipeById(id) {
			return $q.when(db.findOneAsync({_id: id}));
		},
		saveRecipe(recipe) {
			if (!recipe) {
				return $q.reject("No recipe specified");
			}
			if (!recipe._id) {
				return $q.when(db.insertAsync(recipe).then(resultArray => {
					return resultArray[0];
				}));
			} else {
				return $q.when(db.updateAsync({_id: recipe._id}, recipe).then(results => {
					return results[1];
				}));
			}
		},
		getByName(name) {
			if (!name) {
				return $q.resolve([]);
			}
			return $q.when(db.findAsync({name: new RegExp(name, "i")}));
		},
		remove(id) {
			if (!id) {
				return $q.resolve();
			}
			return $q((resolve, reject) => {
				db.remove({_id: id}, err => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			});
		}
	};
}

function promisify(db) {
	Bluebird.promisifyAll(db, {
		filter: function (name, func, target, passesDefaultFilter) {
			return passesDefaultFilter && (["insert", "find", "findOne"].indexOf(name) !== -1);
		}
	});
	db.updateAsync = Bluebird.promisify(db.update, {
		multiArgs: true
	});
}

export default {
	name: "persistenceService",
	fn: persistenceService
};