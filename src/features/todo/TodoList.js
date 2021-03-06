// import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import {
    add,
    selectTodos,
    reset,
    setToDone,
    setToUndone
} from "./todoSlice";

const TodoList = () => {
    const dispatch = useDispatch();

    const todos = useSelector(selectTodos);
    const handleNewTodo = (todo) => {
        // prevents duplications
        if (!todos.some(item => item.title === todo.title)) {
            dispatch(add(todo));
            return true;
        }
        return false;
    }

    const handleChangeStatus = (todo) => {
        dispatch(todo.isDone ? setToUndone(todo) : setToDone(todo));
    }

    return (
        <div>
            <h1>{todos.length > 0 ? todos.length + ' Todos...' : 'Nothing to do yet !'}</h1>
            { todos.map(todo => 
                <TodoItem todo={todo} key={todo.title} changeStatus={handleChangeStatus}></TodoItem>
            )}
            <TodoForm addTodo={handleNewTodo} resetTodos={()=> dispatch(reset())}></TodoForm>
        </div>
    )
}

export default TodoList;