import Datastore from "nedb";
import Bluebird from "bluebird";

function persistenceService($q) {
	let db = new Datastore({filename: "test.db"});
	promisify(db);
	let dbLoadedPromise = db.loadDatabaseAsync();
	return {
		getAll() {
			return $q.when(dbLoadedPromise).then(() => {
				return db.findAsync({});
			});
		},
		getRecipeById(id) {
			return $q.when(dbLoadedPromise).then(() => {
				return db.findOneAsync({_id: id});
			});
		},
		saveRecipe(recipe) {
			if (!recipe) {
				return $q.reject("No recipe specified");
			}
			if (!recipe._id) {
				return $q.when(dbLoadedPromise).then(() => {
					return db.insertAsync(recipe).then(resultArray => {
						return resultArray[0];
					});

				});
			} else {
				return $q.when(dbLoadedPromise).then(() => {
					return db.updateAsync({_id: recipe._id}, recipe).then(results => {
						return results[1];
					});
				});
			}
		},
		getRecipeByName(name) {
			if (!name) {
				return $q.resolve([]);
			}
			return $q.when(db.findAsync({name: new RegExp(name, "i")}));
		},
		remove(id) {
			if (!id) {
				return $q.resolve();
			}
			return $q.when(db.removeAsync({_id: id}));
		}
	};
}

function promisify(db) {
	Bluebird.promisifyAll(db, {
		filter: function (name, func, target, passesDefaultFilter) {
			return passesDefaultFilter && (["insert", "find", "findOne", "loadDatabase", "remove"].indexOf(name) !== -1);
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