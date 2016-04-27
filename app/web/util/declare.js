function declare(entityType, entityMap, module) {
	Object.keys(entityMap).forEach((key) => {
		let item = entityMap[key];

		if (!item || (typeof item !== "object")) {
			return;
		}

		if (item.fn && (typeof item.fn === "function")) {
			module[entityType](item.name, item.fn);
		} else if (item.component) {
			module[entityType](item.name, item.component);
		} else {
			declare(entityType, item, module);
		}
	});
}

export default declare;