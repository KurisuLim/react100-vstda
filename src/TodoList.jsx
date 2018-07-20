import React, { Component } from 'react';



class TodoList extends Component {
    constructor(props){
      super(props);

      this.selectPriority = this.selectPriority.bind(this);
      this.textChange = this.textChange.bind(this);
      this.editHandler = this.editHandler.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.onSave = this.onSave.bind(this);


      this.state={
        text: '',
        priority: '',
        
      }
    }

    selectPriority(event){
      this.setState({priority: event.target.value});
    }
  
    textChange(event){
      this.setState({text: event.target.value})
    }

    editHandler(){
      this.setState({text: this.props.todo.text});
      this.props.onEdit(this.props.todo.id)
    }

    onDelete(){
      this.props.onDelete(this.props.todo.id)
    }

    onSave(){
      this.props.onSave(this.props.todo.id,this.state.text, this.state.priority);
       
      
    }

    render() {
      if (this.props.todo.priority == 2) {
          var priority = 'alert-warning';
      } else if (this.props.todo.priority == 3) {
          var priority = 'alert-danger';
      } else {
          var priority = 'alert-success'; 
      }
      if (this.props.todo.editMode === true) {
          return (
              <div className="alert alert-success mb-0 clearfix" >
                  <h6 className="font-weight-bold">Description</h6>
                  <textarea className="form-control update-todo-text" defaultValue={this.props.todo.text} 
                  id="exampleFormControlTextarea1" rows="1" onChange={this.textChange}></textarea>
                  <h6 className="font-weight-bold mt-3 update-todo-priority">Priority</h6>
                  <select className="form-control" defaultValue={this.props.todo.priority} onChange={this.selectPriority}>
                  <option value={''}>Select a Priority</option>
                      <option value="1">Low Priority</option>
                      <option value="2">Mid Priority</option>
                      <option value="3">High Priority</option>
                  </select>
                  <div>
                 <button type="button" className="btn btn-success pull-right 
                 col-sm-3 update-todo " onClick={this.onSave}>Save</button>
                 </div> 
              </div>
            )
              
          }else {
          return (
              <li className={`alert ${priority}`}>
                  <input className="form-check-input ml-1" type="checkbox" id="inlineCheckbox2" />
                  {this.props.todo.text}

                  <button className="pull-right  delete-todo mr-0
                  glyphicon glyphicon-trash" onClick={this.onDelete}>
                  </button>
                  <button className="pull-right  edit-todo mr-auto
                  glyphicon glyphicon-edit" onClick={this.editHandler}>
                  </button>
              </li>);
      }
  }
}
export default TodoList;
