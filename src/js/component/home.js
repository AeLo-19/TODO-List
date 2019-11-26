import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [
				"Hacer café",
				"Hacer la cama",
				"Tomar agua",
				"Regar las plantas"
			],
			newTask: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleAddTask = this.handleAddTask.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}
	handleDelete(event, id) {
		console.log(event, id);
		let tasksLeft = this.state.tasks.filter((value, index) => {
			return index != id;
		});
		console.log(tasksLeft);
		this.setState({
			newTask: this.state.newTask,
			tasks: tasksLeft
		});
	}
	handleAddTask(event) {
		event.preventDefault();
		this.setState({
			tasks: [...this.state.tasks, this.state.newTask],
			newTask: ""
		});
	}
	handleChange(event) {
		this.setState({
			tasks: this.state.tasks,
			newTask: event.target.value
		});
	}
	render() {
		let tasks = this.state.tasks;
		return (
			<div className="container d-flex flex-column">
				<section className="TaskList">
					<header className="todo-header text-center mb-3">
						<h1 className="display-3">Lista de Tareas</h1>
					</header>
					<form onSubmit={this.handleAddTask} className="text-center">
						<input
							className="my-5 mx-auto display-4"
							placeholder="¡Tareas nuevas!"
							onChange={this.handleChange}
							value={this.state.newTask}
						/>
					</form>
					<ul className="main-list mx-auto">
						{tasks.map((value, index) => {
							return (
								<li
									key={index}
									className="list-item display-4 my-2 mx-0">
									{value}
									<span
										onClick={event =>
											this.handleDelete(event, index)
										}
										className="delete"
									/>
								</li>
							);
						})}
					</ul>
					<footer className="contador mx-auto mt-5">
						{this.state.tasks.length > 1 ? (
							<p>Faltan {this.state.tasks.length} tareas...</p>
						) : this.state.tasks.length == 1 ? (
							<p>
								Queda {this.state.tasks.length} tarea por hacer,
								tu puedes!
							</p>
						) : (
							<p>Felicitaciones terminaste todo!</p>
						)}
					</footer>
				</section>
			</div>
		);
	}
}

export default Home;
