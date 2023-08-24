import { useState } from 'react';
import { createTodo } from '../../api/todo';
import { useTodoContext } from '../../context/TodoContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

const AddTodo = () => {
  const { todoList: prevTodos, handleCreateTodo } = useTodoContext();
  const [inputData, setInputData] = useState('');

  const handleInputValueChange = event => {
    setInputData(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    if (inputData && inputData.trim() === '') {
      alert('할 일을 입력해주세요.');
      return;
    }

    try {
      const newTodo = await createTodo(inputData);
      handleCreateTodo(prevTodos, newTodo);
      alert('할 일이 추가되었습니다.');

      setInputData('');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Input
        placeholder="추가할 항목을 입력해주세요."
        onChange={handleInputValueChange}
        value={inputData}
        data-testid="new-todo-input"
      />
      <Button variant="primary" onClick={handleFormSubmit} data-testid="new-todo-add-button">
        추가
      </Button>
    </form>
  );
};

export default AddTodo;
