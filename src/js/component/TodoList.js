import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const TodoList = () => {
	// Setting up an array with some ToDo items
	const [listArray, setListArray] = useState([
		"Do homework",
		"Catch up on videos",
		"Progam a website"
	]);

	// This is to add a task to the ToDo list
	const addItem = event => {
		if (event.keyCode === 13) {
			let userInput = event.target.value;
			const newTodo = [...listArray, userInput];
			setListArray(newTodo);
			event.target.value = "";
		}
	};

	// This is the remove item function that will be called when button is clicked
	const removeItem = index => {
		const newArray = listArray.filter((item, i) => i != index);
		setListArray(newArray);
	};

	// Create variable that will create a list HTML with a given array
	let createdList = listArray.map((item, i) => {
		return listArray.length >= 1 ? (
			<li className="list-group-item" key={i}>
				{item} <button onClick={() => removeItem(i)}>X</button>
			</li>
		) : (
			<li className="list-group-item">No tasks, add a task</li>
		);
	});

	// Below returns structure of ToDo List
	return (
		<div>
			<h1 className="text-center">To Do List</h1>
			<input
				className="m-2 w-100"
				placeholder="Add a task here"
				type="text"
				onKeyDown={addItem}
			/>
			<ul className="list-group m-2">
				{createdList}
				<li className="list-group-item p-1 pl-4">
					{" "}
					{listArray.length}{" "}
					{listArray.length == 1 ? "item" : "items"} left
				</li>
			</ul>
		</div>
	);
};
