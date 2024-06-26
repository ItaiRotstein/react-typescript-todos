import { memo } from 'react';

import './styles.css';

import { Todo } from '../model';
import TodoPreview from './TodoPreview';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {

  return (
    <div className="container">
      <Droppable droppableId={'TodosList'}>
        {(provided, snapshot) => (
          <div className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <span className="todos_heading">
              Active tasks
            </span>
            {todos.map((todo, index) => (
              <TodoPreview
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId={'TodosRemove'}>
        {(provided, snapshot) => (
          <div className={`todos remove ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <span className="todos_heading">
              Completed tasks
            </span>
            {completedTodos.map((todo, index) => (
              <TodoPreview
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default memo(TodoList);


{/* <div className='todos'>
{todos.map((todo) => (
	<TodoPreview
		todo={todo}
		key={todo.id}
		todos={todos}
		setTodos={setTodos}
	/>
))}
</div>  */}