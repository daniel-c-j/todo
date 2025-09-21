import React from 'react';
import Header from './components/Header';
import Body from './components/body/Body';
import { TodoProvider } from './hooks/todo_context';

const App: React.FC = () => {

  return (
    <>
      <TodoProvider>
        <div className='p-4 max-w-5xl min-w-[345px] min-h-screen bg-gray-100/70 w-full lg:mx-auto md:px-10 sm:rounded-xl'>
          <Header />
          <Body />
        </div>
      </TodoProvider>
    </>
  );
};

export default App;