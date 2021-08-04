import { TodoService } from './services/todo.service';
import { Component } from '@angular/core';
import { Todo } from './model/Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todoList: Array<Todo> = [];
  newTodo: Todo = new Todo();
  selectedTodo: Todo = new Todo();

  constructor(private _todoService: TodoService) {
    this.newTodo.userId = 6;
    this.newTodo.title = '';
    this.newTodo.completed = false;
  }

  ngOnInit(): void {
    this._todoService.getTodos().subscribe(todos => this.todoList = todos);
    this.newTodo.id = this.todoList.length + 1;
  }

  add(newItem: any) {
    this.newTodo.title = newItem.value;
    this._todoService.addTodo(this.newTodo).subscribe(todo => {
      this.todoList.unshift(todo);
      this.newTodo.title = '';
      this.newTodo.id++;
      this.newTodo.completed = false;
      this.selectedTodo = new Todo();
    })
  }

  remove(todoId: any) {
    this._todoService.deleteTodo(todoId).subscribe(res => res);
  }

  todoClickEvent(todo: Todo) {
    this.selectedTodo = todo;
  }

  todoSelectionChange(todo: Todo) {
    this.todoList.forEach(t => (t.id === todo.id) ? t.completed = !t.completed : t);
  }

  updateTodo(todo: any) {
    this.selectedTodo.title = todo.value;
    this._todoService.editTodo(this.selectedTodo).subscribe(todo => {
      this.todoList.forEach(t => (t.id === todo.id) ? t = todo : t);
      this.selectedTodo = new Todo();
    });
  }
}
