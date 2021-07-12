import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const TodoList = () => {
	const [listArray, setListArray] = useState([
		"Do homework",
		"Catch up on videos",
		"Progam a website"
	]);

	let createdList = listArray.map((item, index) => {
		return <li key={index}>{item}</li>;
	});

	return (
		<>
			<h1>To do List</h1>
			<input type="text" onChange={event => event.target.value} />
			<ul>{createdList}</ul>
		</>
	);
};
