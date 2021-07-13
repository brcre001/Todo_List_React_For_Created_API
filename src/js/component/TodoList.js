import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const TodoList = () => {
	const [listArray, setListArray] = useState([
		"Do homework",
		"Catch up on videos",
		"Progam a website"
	]);

	let createdList = listArray.map((item, i) => {
		return (
			<li key={i}>
				{item} <button onClick="">X</button>
			</li>
		);
	});

	return (
		<>
			<h1>To do List</h1>
			<input placeholder="Add a task here" type="text" />
			<ul>{createdList}</ul>
		</>
	);
};
