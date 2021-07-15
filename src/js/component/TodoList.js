import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const TodoList = () => {
	// Setting up useState
	const [listArray, setListArray] = useState([
		"Do homework",
		"Catch up on videos",
		"Progam a website"
	]);
	const [isShown, setIsShown] = useState({ state: false, index: 0 });

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
		return (
			<li
				className="list-group-item"
				key={i}
				onMouseEnter={() => setIsShown({ state: true, index: i })}
				onMouseLeave={() => setIsShown({ state: false, index: 0 })}>
				<span className="py-4 mt-2">{item}</span>
				{isShown.state == true && isShown.index == i ? (
					<button
						className="btn btn-danger float-right"
						onClick={() => removeItem(i)}>
						X
					</button>
				) : (
					""
				)}
			</li>
		);
	});

	// Below returns structure of ToDo List
	return (
		<div className="p-2">
			<h1 className="text-center">To Do List</h1>
			<input
				className="w-100 mb-2"
				placeholder="Add a task here"
				type="text"
				onKeyDown={addItem}
			/>
			<ul className="list-group">
				{listArray.length >= 1 ? (
					createdList
				) : (
					<li className="list-group-item">No tasks, add a task</li>
				)}
				<li className="list-group-item p-1">
					{listArray.length}
					{listArray.length == 1 ? " item" : " items"} left
				</li>
			</ul>
		</div>
	);
};
