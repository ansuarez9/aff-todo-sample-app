import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../model/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  private _todoList: Todo[] = [];
  @Input() 
  set todoList(list: Todo[]) {
    this._todoList = list;
  }

  get todoList(): Todo[] {
    return this._todoList;
  }

  @Output() removeTodo: EventEmitter<number> = new EventEmitter();
  @Output() todoClickEvent: EventEmitter<Todo> = new EventEmitter();
  @Output() todoSelectionChange: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  remove(todoId: number){
    this.todoList = this.todoList.filter(todo => todo.id !== todoId);
    this.removeTodo.emit(todoId);
  }

  todoEdit(e:any, todo:Todo) {
    e.preventDefault();
    e.stopPropagation();
    this.todoClickEvent.emit(todo);
  }

  onTodoClick(todo: Todo){
    this.todoSelectionChange.emit(todo);
  }

}
