import { useCallback, useState } from 'react';
import './App.css';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import { Todo } from './model';
import InputField from './components/InputField';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const newJob = {
      id: Date.now(),
      title,
      isDone: false,
    };
    if (title) {
      setTodos([...todos, newJob]);
      setTitle('');
    }
  }, [title]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    let add,
      active = todos,
      complete = completedTodos

    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='app'>
        <span className='heading'>Taskit</span>
        <InputField todo={title} setTodo={setTitle} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
