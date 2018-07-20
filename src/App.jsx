import React, { Component } from 'react';
import TodoList from './TodoList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    text: '',
    priority: '',
    todos: [],
    }
    this.click = 0;
    this.editMode = false;
    this.selectPriority = this.selectPriority.bind(this);
    this.textChange = this.textChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.priorityStatus = this.priorityStatus.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);

  }

  selectPriority(event){
    this.setState({priority: event.target.value});
  }

  textChange(event){
    this.setState({text: event.target.value})
  }

  handleClick(event){
    if(this.state.text ==''){
      return false
    }
    //making an array of new todolist
    const newTodo = {
      id: this.click++,
      text: this.state.text,
      priority: this.state.priority,
      editMode: false
    }

    //dumping info of current todo state to previous
    let previousTodo = this.state.todos;

    //combining the newTodo to the previous Todo
    previousTodo.push(newTodo);

    //connecting todos prop to previousTodo
    this.setState({ todos: previousTodo});
  }

priorityStatus(id){
  //Method to find the index of each todo
  //in the todo array
  const index = this.state.todos.findIndex((todo)=> todo.id == id);
  const previousTodo = this.state.todos;

  previousTodo[index].editMode = true;

  this.setState(({todos: previousTodo}));
}

onDelete(id){
  //Method to delete a part of the array of todolist
  const index = this.state.todos.findIndex((todo)=> todo.id == id);
  const previousTodo = this.state.todos;
  //remove an idex in an array
  previousTodo.splice(index, 1);
  this.setState({todos:previousTodo});
}

handleSave(id,text,priority){
    //Method to delete a part of the array of todolist
    console.log(id);
    const index = this.state.todos.findIndex((todo)=> todo.id == id);
    const previousTodo = this.state.todos;
    console.log(previousTodo,index);
    previousTodo[index].editMode = false;
    previousTodo[index].text = text;
    previousTodo[index].priority = priority;

    this.setState({todos: previousTodo});
}


  render(){
    return(
      <div className='container'>
        <h1 className='white text-white'>Very Simple Todo App</h1>
          <p className='white text-white'>Track all the things</p>
          <hr />
          <div className='row'>
            <div className='col-sm-4'>
              <div className='panel panel-default'>
                <div className='panel-heading'>Add New Too</div>
                  <div className='panel-body'>
                    {/*Textarea & Selector  */}
                    <label className='text-bold'>I want to..</label>
                    <textarea className='create-todo-text'onChange={this.textChange}></textarea>

                    <label className='text-bold'> How much of a priority is this?</label>
                    <div>
                    <select className='create-todo-priority btn-block' onChange={this.selectPriority} placeholder='Select a Priority'>
                      <option value={1}>Low Priority</option>
                      <option value={2}>Medium Priority</option>
                      <option value={3}>High Priority</option>
                    </select>
                    </div>
                    <div className='panel-footer'>
                    {/* button to Add to do list */}
                    <button className='create-todo btn btn-success btn-block' value ='submit' onClick={this.handleClick}>Add</button>
                    {/* panel-footer */}
                      </div>
                  {/* panel-body */}
                    </div>
                {/* panel */}
                </div>
              {/* col-sm-4 */}
              </div>

              <div className="col-sm-8">
            <div className="panel panel-default mb-5" >

              <div className="panel-heading">View Todos</div>

              <div className="alert alert-info mb-0">
                <h5 className="card-title">Welcome to Very Simple Todo App!</h5>
                <p className="card-text  font-italic">Get started now by adding a new todo on the left.</p>
              </div>
              <ul>
                {
                this.state.todos.map(todo => (
                  <TodoList key={todo.id} 
                  onEdit={this.priorityStatus} 
                  onSave={this.handleSave} 
                  onDelete={this.onDelete} 
                  todo={todo} />
                  ))
                }
              </ul>

            </div>
          </div>

            {/* row */}
            </div>
        </div>
    ); //return
  }//render
}// App Component

export default App;
