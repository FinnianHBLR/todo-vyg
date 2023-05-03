import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { title } from "process";
import { ListFormat } from "typescript";
// https://github.com/florinpop17/app-ideas/blob/master/Projects/2-Intermediate/To-Do-App.md

function App() {
  interface ListItem {
    id: number;
    title: string;
    completed: boolean;
  }

  const [itemList, setItemList] = useState<ListItem[]>([]);
  const [form, setForm] = useState<string>("");

  const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // listItem.map creates new list of ids, then compares them.
    const maxNumber: number = Math.max(...itemList.map((item: ListItem) => item.id));
    console.log(itemList);


    setItemList((prevItems) => [
      ...prevItems,
      {
        id: (itemList.length === 0) ? 0: maxNumber+1,
        title: (form === "") ? "No Title" : form,
        completed: false
      },
    ]);
    // Reset the form input
    setForm("");
  };

  const updateFormState = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setForm(event.target.value);
    console.log(form);
  };

  const delteItem = (id: number) => {
    // Get current list, remove id ID is the same.
    setItemList((currentList) => currentList.filter(item => item.id !== id))

  }

  const completeItem = (id: number, event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Set item when ID is the same. Otherwise just replace with the same item.
    setItemList((currentList) => currentList.map(item => (item.id === id) ? {...item, completed: true} : item))
    
  }

  return (
    <div className="App">
      <form onSubmit={handleClick}>
        <label>Input your Task</label>
        <input value={form} onChange={updateFormState} type="text"></input>
        <button type="submit">Create</button>
      </form>
      <div>
        {itemList &&
          itemList.map((item) => (
            <div key={item.id}>
              <h1 style={item.completed ? { textDecoration : 'line-through' }: {textDecoration : 'none;'}}>{item.title}</h1>
              <p>{item.id}</p>
              <form>
                <button onClick={() => delteItem(item.id)} type="button">Remove</button>
                <button disabled={item.completed ? true : false} onClick={(event) => completeItem(item.id, event)}>Completed</button>
              </form>            
            </div>
          ))}
      </div>
    </div>
  );
}


export default App;
