import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const TodoList = () => {
	// Setting up useState
	const [listArray, setListArray] = useState([]);
	const [isShown, setIsShown] = useState({ state: false, index: 0 });
	const [message, setMessage] = useState("");

	// Setting URL into a variable for use
	const apiURL = "https://assets.breatheco.de/apis/fake/todos/user/brcre001";

	// UseEffect for retrieving stored values from database on mount
	useEffect(() => {
		// fetch(apiURL)
		// 	.then(resp => {
		// 		console.log(resp.status);
		// 		if (resp.status >= 200 && resp.status < 300) {
		// 			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		// 		} else {
		// 			alert(
		// 				`This is a client error, its your fault this is a ${resp.status}`
		// 			);
		// 			throw Error(`${resp.ok} ${resp.status}`);
		// 		}
		// 		// console.log(resp.ok); // will be true if the response is successfull
		// 		// console.log(resp.status); // the status code = 200 or code = 400 etc.
		// 	})
		// 	.then(data => {
		// 		//here is were your code should start after the fetch finishes
		// 		// console.log(data); //this will print on the console the exact object received from the server
		// 		setListArray(data);
		// 	})
		// 	.catch(error => {
		// 		//error handling
		// 		console.log("This is an error: ", error);
		// 	});
		initList();
	}, []);

	// UseEffect for updating Todo List array values
	useEffect(() => {
		// fetch(apiURL, {
		// 	method: "PUT", // or 'POST'
		// 	body: JSON.stringify(listArray), // data can be `string` or {object}!
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	}
		// })
		// 	.then(res => res.json())
		// 	.then(response => console.log("Success:", JSON.stringify(response)))
		// 	.catch(error => console.error("Error:", error));
		updateList();
	}, [listArray]);

	/* NEW SET OF FUNCTIONS USING ASYNC */
	const initList = async () => {
		const response = await fetch(apiURL);
		try {
			const data = await response.json();
			setListArray(data);
		} catch (error) {
			throw new Error(error);
		}
	};

	const updateList = async () => {
		const response = await fetch(apiURL, {
			method: "PUT", // or 'POST'
			body: JSON.stringify(listArray), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		});
		try {
			const data = await response.json();
			console.log("Success:", JSON.stringify(data));
		} catch (error) {
			throw new Error(error);
		}
	};

	// Function to add Todo List item when enter key is pressed
	const addItem = event => {
		if (event.keyCode === 13) {
			let userInput = { label: event.target.value, done: false };
			const newTodo = [...listArray, userInput];
			setListArray(newTodo);
			console.log(newTodo);
			event.target.value = "";
		}
	};

	// Function to make a line through a done item
	const doneItem = index => {
		let newArray = listArray.map((item, i) => {
			if (i == index) {
				item.done = !item.done;
			}
			return item;
		});
		setListArray(newArray);
	};

	// Function to remove Todo List item, added to button
	const removeItem = index => {
		const newArray = listArray.filter((item, i) => i != index);
		setListArray(newArray);
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
							onClick={() => removeItem(i)}>
							<i className="fas fa-trash-alt"></i>
						</button>
						<button
							className="btn btn-success float-right"
							onClick={() => doneItem(i)}>
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
