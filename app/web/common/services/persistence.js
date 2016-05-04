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
	let db = new Datastore({filename: "test.db"});
	// db.loadDatabase(err => {
	// 	if (err) {
	// 		console.error(err);
	// 	} else {
	// 		db.insert(TEST_DB[0]);
	// 	}
	// });
	promisify(db);
	let dbLoadedPromise = db.loadDatabaseAsync();
	// db.insert(TEST_DB[0]);
	return {
		getAll() {
			// return $q((resolve, reject) => {
			// 	db.find({}, (err, results) => {
			// 		if (err) {
			// 			reject(err);
			// 		} else {
			// 			resolve(results);
			// 		}
			// 	});
			// });
			return $q.when(db.findAsync({}));
		},
		getRecipeById(id) {
			// return $q((resolve, reject) => {
			// 	db.findOne({_id: id}, (err, result) => {
			// 		if (err) {
			// 			reject(err);
			// 		} else {
			// 			resolve(result);
			// 		}
			// 	});
			// });
			return $q.when(db.findOneAsync({_id: id}));
		},
		saveRecipe(recipe) {
			if (!recipe) {
				return $q.reject("No recipe specified");
			}
			if (!recipe._id) {
				// return $q((resolve, reject) => {
				// 	db.insert(recipe, (err, results) => {
				// 		if (err) {
				// 			reject(err);
				// 		} else {
				// 			resolve(results[0]);
				// 		}
				// 	});
				// });
				return $q.when(db.insertAsync(recipe).then(resultArray => {
					return resultArray[0];
				}));
			} else {
				// return $q((resolve, reject) => {
				// 	db.update({_id: recipe._id}, recipe, (err, numAffected, affectedDocuments) => {
				// 		if (err) {
				// 			reject(err);
				// 		} else {
				// 			resolve(affectedDocuments);
				// 		}
				// 	});
				// });
				return $q.when(db.updateAsync({_id: recipe._id}, recipe).then(results => {
					return results[1];
				}));
			}
		},
		getRecipeByName(name) {
			if (!name) {
				return $q.resolve([]);
			}
			return $q((resolve, reject) => {
				db.find({name: new RegExp(name, "i")}, (err, results) => {
					if (err) {
						reject(err);
					} else {
						resolve(results);
					}
				});
			});
			// return $q.when(db.findAsync({name: new RegExp(name, "i")}));
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
			return passesDefaultFilter && (["insert", "find", "findOne", "loadDatabase"].indexOf(name) !== -1);
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