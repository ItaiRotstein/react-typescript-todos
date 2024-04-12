import { useEffect, useState, useRef } from 'react';
import { Todo } from '../model';
import './styles.css';

import { AiFillEdit } from 'react-icons/ai';
import { MdDelete, MdDone } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number;
};

const TodoPreview = ({ todo, todos, setTodos, index }: Props) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(todo.title);

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus();
    }, [isEdit])

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleSubmit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        if (title) {
            setTodos(todos.map((todo) =>
                todo.id === id ? { ...todo, title } : todo));
            setTitle('');
            setIsEdit(false);
        };
    };

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form 
                className={`todo_preview ${snapshot.isDragging ? 'drag' : ''}`} 
                onSubmit={(e) => handleSubmit(e, todo.id)}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                >
                    {isEdit ?
                        (
                            <input
                                className='todo_preview--text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                ref={inputRef}
                            />
                        ) : (
                            todo.isDone ? (
                                <s className='todo_preview--text'>{todo.title}</s>
                            ) : (
                                <span className='todo_preview--text'>{todo.title}</span>
                            )
                        )
                    }

                    <div>
                        <span className='icon' onClick={() => {
                            if (!isEdit && !todo.isDone) {
                                setIsEdit(!isEdit);
                            }
                        }}
                        >
                            <AiFillEdit />
                        </span>
                        <span className='icon' onClick={() => handleDelete(todo.id)}>
                            <MdDelete />
                        </span>
                        <span className='icon' onClick={() => handleDone(todo.id)}>
                            <MdDone />
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    )
};
export default TodoPreview;
