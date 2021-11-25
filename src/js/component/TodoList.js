import React, { useState, useEffect } from "react";

export const TodoList = () => {
	// Setting up useState
	const [listArray, setListArray] = useState([]);
	const [isShown, setIsShown] = useState({ state: false, index: 0 });

	// Setting URL into a variable for use
	const apiURL = "https://8000-copper-slug-zzx1gf65.ws-us17.gitpod.io/todos";

	const fetchData = async () => {
		const response = await fetch(apiURL);
		const data = await response.json();
		setListArray(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const addTodo = async todo => {
		try {
			const response = await fetch(apiURL, {
				method: "POST",
				body: JSON.stringify(todo),
				headers: {
					"Content-Type": "application/json"
				}
			});
			const data = await response.json();
			setListArray(data);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTodo = async position => {
		try {
			const response = await fetch(`${apiURL}/${position}`, {
				method: "DELETE"
			});
			const data = await response.json();
			setListArray(data);
		} catch (error) {
			console.log(error);
		}
	};

	// This will be used to change the done key
	// to either True or False
	const changeTodo = async position => {};

	const addItem = event => {
		if (event.keyCode === 13) {
			let userInput = { label: event.target.value, done: false };
			addTodo(userInput);
		}
	};

	// Variable that will create a HTML list with a given array
	let createdList = listArray.map((item, i) => {
		return (
			<li
				className="list-group-item"
				key={i}
				onMouseEnter={() => setIsShown({ state: true, index: i })}
				onMouseLeave={() => setIsShown({ state: false, index: 0 })}>
				<span className={`py-4 mt-2 ${item.done && "doneTask"}`}>
					{item.label}
				</span>

				{/* This shows the delete button when mouse is hovered over specific list item */}
				{isShown.state == true && isShown.index == i ? (
					<>
						<button
							className="btn btn-danger float-right ml-1"
							onClick={() => deleteTodo(i)}>
							<i className="fas fa-trash-alt"></i>
						</button>
						<button className="btn btn-success float-right">
							<i className="fas fa-check"></i>
						</button>{" "}
					</>
				) : (
					""
				)}
			</li>
		);
	});

	// This returns the structure of the webpage
	return (
		<div className="col-8 mx-auto p-2">
			<h1 className="text-center">To Do List</h1>
			<input
				className="w-100 mb-2 rounded"
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
