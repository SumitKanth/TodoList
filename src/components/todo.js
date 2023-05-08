import React, {useState, useEffect} from 'react'
import './style.css'

const Todo = () => {
    // Edited button style
    const editBtn = {
        backgroundColor: "#121212",
        fontSize: "1.2rem",
        marginLeft: ".5rem",
        cursor: "pointer",
        color: "#808080"
    }

    // Get LocalStorage 
    const getLocal = () => {
        const items = localStorage.getItem('TodoList');
        if(items){
            return JSON.parse(items);
        }
        else{
            return [];
        }
    }

    // UseState
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState(getLocal());
    const [togel, setTogel] = useState(false);
    const [isEditId, setIsEditId] = useState("");

    // Add Button Function
    const add = () => {
        if(!input){
            alert('Plz type your dono first!');
        }
        else if(input && togel){
            setTodos(
                todos.map((todo) => {
                    if(todo.id === isEditId){
                       return {...todo, name: input}
                    }
                    return todo;
                })

            )
        setInput("");
        }
        else{
            const allTodo = {
                id: new Date().getTime().toString(),
                name: input
            }
            setTodos([...todos, allTodo])
            setInput('')
        }
        setTogel(false)
    }

    // Delete Button Function
    const deleteTodo = (id) => {
       const remainedTodo =  todos.filter((todo) => {
            return todo.id !== id;
        });

        setTodos(remainedTodo);
        
    }

    // Remove All Button Fuction
    const removeAll = () => {
        setTodos([]);
    }

    // Set Local Storage by useEffect
    useEffect(() => {
        localStorage.setItem('TodoList', JSON.stringify(todos))
    });

    // Edit Text
    const editText = (textId) => {
        const editElement = todos.find((todo) => {
            if(todo.id === textId){
                return todo.name;
            }
        })
        setInput(editElement.name);
        setTogel(true);
        setIsEditId(textId);

    }

    return(
        <>
        <div className="todo">
            <div className="todo-items">
                <h1>Todo List</h1>
                <p>
                <input type="text" name="listItem" placeholder='Type Here'
                value={input} onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
                /> 
                {togel ?  <i className="fal fa-edit" style={editBtn} onClick={() => {add()}}></i> :
                          <i className="far fa-list-ul" id='todoIcon' onClick={() => {add()}}></i>
                }
                 

                </p>

                {/* Todo Items */}
                {todos.map((todo) => {
                    return(
                        <div className="todoItems" key={todo.id}>
                        <span className='todoPara'>{todo.name}<i className="far fa-trash-alt" 
                        onClick={() => {deleteTodo(todo.id)}}></i></span>
                        <i className="fal fa-edit" style={editBtn} onClick={() => editText(todo.id)}></i>
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