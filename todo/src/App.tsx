import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { title } from "process";
import { ListFormat } from "typescript";

function App() {
  interface ListItem {
    id: number;
    title: string;
  }

  const [itemList, setItemList] = useState<ListItem[]>([]);
  const [form, setForm] = useState<string>("");

  const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setItemList((prevItems) => [
      ...prevItems,
      {
        id: itemList[itemList.length - 1].id,
        title: form,
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

  return (
    <div className="App">
      <form onSubmit={handleClick}>
        <label>Input your Task</label>
        <input value={form} onChange={updateFormState} type="text"></input>
        <button type="submit">Yeah boi</button>
      </form>
      <div>
        {itemList &&
          itemList.map((item) => (
            <div key={item.id}>
              <h1>{item.title}</h1>
              <p>{item.id}</p>
              <form>
                <button onClick={() => delteItem(item.id)} type="button">Done</button>
              </form>            
            </div>
          ))}
      </div>
    </div>
  );
}


export default App;
