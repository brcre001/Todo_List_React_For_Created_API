import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const TodoList = () => {
	// Setting up useState
	const [listArray, setListArray] = useState([]);
	const [isShown, setIsShown] = useState({ state: false, index: 0 });

	// UseEffect for retrieving stored values from database on mount
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/brcre001")
			.then(resp => {
				// console.log(resp.ok); // will be true if the response is successfull
				// console.log(resp.status); // the status code = 200 or code = 400 etc.
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				// console.log(data); //this will print on the console the exact object received from the server
				setListArray(data);
			})
			.catch(error => {
				//error handling
				console.log("This is an error: ", error);
			});
	}, []);

	// UseEffect for updating array values
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/brcre001", {
			method: "PUT", // or 'POST'
			body: JSON.stringify(listArray), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(response => console.log("Success:", JSON.stringify(response)))
			.catch(error => console.error("Error:", error));
	}, [listArray]);

	// This is to add a task to the ToDo list
	const addItem = event => {
		if (event.keyCode === 13) {
			let userInput = { label: event.target.value, done: false };
			const newTodo = [...listArray, userInput];
			setListArray(newTodo);
			console.log(newTodo);
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
				<span className="py-4 mt-2">{item.label}</span>
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
