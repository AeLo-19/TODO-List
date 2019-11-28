import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
var apiUrl ="https://assets.breatheco.de/apis/fake/todos/user/AeLo-19"
class Home extends React.Component {
	constructor(props) {
		super(props);
		 this.state = {
			tasks: [],
		 	newTask: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleAddTask = this.handleAddTask.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
    }
    
    componentDidMount() {
        //solicita tareas
        fetch(apiUrl,
            {
                method: "GET",
                header: {
                    "Content-Type": "application/JSON"
                }
                
            }
        ) .then(response => {
            let res = response.clone();
            console.log(res.status);

            if (res,status == 404) {
                let emptyArray = [];
                fetch(
                    apiUrl,
                    {
                        method: "POST",
                        body: JSON.stringify(emptyArray),
                        headers: {
                            "Content-type": "application/JSON"
                        }
                    }

                ) .then(secondResponse => {
                    console.log("tried to create user: ");
                    console.log(secondResponse.status);
                    console.log(secondResponse.text());
                    if (secondResponse.ok) {
                        fetch(
                            apiUrl,
                            {
                                method: "GET",
                                headers:{
                                    "Content-Type": "application/JSON"
                                }
                            }
                        ) .then(thirdResponse => {
                            return thirdResponse.json();
                        })
                        .catch(error => console.log(error));            
                } else {
                    return [
                        {
                            label: "ERROR, user not created",
                            donde: false
                        }
                    ];
                }
            }) 
            .catch(error => {
                console.log(error);
            });
        }  else {
            return response.json();
        }
    }) .then(data => {
        console.log(data);
        this.setState({
            task: data,

            newTask: this.state.newTask
        });
    })
    .catch(error => {
        console.log(error);
    });
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
        let currentTasks = this.state.tasks;
        currentTasks.push(
            {
                label: this.state.newTask,
                done: false
            });
            console.log(currentTasks);
            fetch(
                apiUrl,
                {
                    method: "PUT",
                    body: JSON.stringify(currentTasks),
                    headers: {
                        "Content-Type": "application/JSON"
                    }
                }
            ) .then( response => {
                if (response.ok) {
                    fetch(
                        apiUrl,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/JSON"
                            }
                        }
                    ) .then(secondResponse => {
                        return secondResponse.json();
                    }) .then (dat => {
                        this.setState({
                            tasks: data,
                            newTask: ""
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
                } else {
                    console.log("error fetching tasks ", response.text());
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
	
	handleChange(event) {
		this.setState({
			...this.state,
			newTask: event.target.value
		});
    }
    handleDeleteAll(event){
        fetch(
            apiUrl,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/JSON"
                }
            }
        ) .then(response => {
            if (response.ok) {
                console.log(
                    "taks deleted! ",
                    response.status,
                    response.text()
                );
                let emptyArray = []
                fetch(
                    apiUrl,
                    {
                        method: "POST",
                        body: JSON.stringify(emptyArray),
                        headers: {
                            "Content-Type": "application/JSON"
                        }
                    }
                ) .then(secondResponse => {
                    console.log("tried to create user: ");
                    console.log(secondResponse.status);
                    console.log(secondResponse.text());
                    if (secondResponse.ok) {
                        fetch(
                            apiUrl,
                            {
                                    method: "GET",
                                    headers: {
                                    "Content-Type": "application/JSON"
                                    }
                            }
                        ) .then(thirdResponse => {
                            return thirdResponse.json();
                        }) .then(data => {
                            this.setState({
                                tasks: data,
                                newTask: ""
                            });
                        })
                        .catch(error => console.log(error));
                    } else {
                        this.setState({
                            label: "ERROR, user not created",
							done: false
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            } else {
                console.log(
                "couldn't delete tasks because: ",
                response.text()
            );
        }
    })
    .catch(error => console.log(error));
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
