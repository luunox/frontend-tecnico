export default function tableToObj(table) {
	var rows = table.rows;
	var propCells = rows[0].cells;
	var propNames = [];
	var results = [];
	var obj, row, cells;

	for (var i = 0, iLen = propCells.length; i < iLen; i++) {
		propNames.push(propCells[i].textContent || propCells[i].innerText);
	}

	for (var j = 1, jLen = rows.length; j < jLen; j++) {
		cells = rows[j].cells;
		obj = {};

		const file = cells[0].textContent || cells[0].innerText;

		for (var k = 1; k < iLen; k++) {
			obj[propNames[k]] = cells[k].textContent || cells[k].innerText;
		}

		const fileId = results.findIndex((val, i, arr) => val.file === file);
		fileId !== -1 ? (results[fileId] = { file, lines: [...results[fileId].lines, obj] }) : results.push({ file, lines: [obj] });
	}

	return results;
}
