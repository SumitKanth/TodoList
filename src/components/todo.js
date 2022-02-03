import React, {useState, useEffect} from 'react'
import './style.css'

const Todo = () => {

    const getLocal = () => {
        const items = localStorage.getItem('TodoList');
        if(items){
            return JSON.parse(items);
        }
        else{
            return [];
        }
    }

    const [input, setInput] = useState('');
    const [todos, setTodos] = useState(getLocal());


    const add = () => {
        if(!input){
            alert('Plz type your dono first!');
        }
        else{
            const allTodo = {
                id: new Date().getTime().toString(),
                name: input
            }
            setTodos([...todos, allTodo])
            setInput('')
        }
    }

    const deleteTodo = (id) => {
       const remainedTodo =  todos.filter((todo) => {
            return todo.id !== id;
        });

        setTodos(remainedTodo);
        
    }

    const removeAll = () => {
        setTodos([]);
    }

    useEffect(() => {
        localStorage.setItem('TodoList', JSON.stringify(todos))
    });


    return(
        <>
        <div className="todo">
            <div className="todo-items">
                <h1>Todo List</h1>
                <p>
                <input type="text" name="listItem" placeholder='Type Here'
                value={input} onChange={(e) => setInput(e.target.value)}
                /> 
                <i className="far fa-list-ul" id='todoIcon' onClick={() => {add()}}></i>
                </p>

                {/* Todo Items */}
                {todos.map((todo) => {
                    return(
                        <div className="todoItems" key={todo.id}>
                        <span className='todoPara'>{todo.name}<i className="far fa-trash-alt" onClick={() => {deleteTodo(todo.id)}}></i></span>
                        <hr />
                        </div>
                    )
                    
                } )}
                

                <button onClick={() => removeAll()}>Remove All</button>

            </div>

        </div>
        </>
    );
};

export default Todo