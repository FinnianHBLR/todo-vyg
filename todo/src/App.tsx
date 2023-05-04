import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { title } from "process";
import { ListFormat } from "typescript";
import { Filters } from "./types/types";

import { CheckBoxFilters } from "./components/filters";

// https://github.com/florinpop17/app-ideas/blob/master/Projects/2-Intermediate/To-Do-App.md

function App() {
  interface ListItem {
    id: number;
    title: string;
    completed: boolean;
    editing: boolean;
    date: string;
  }

  const [itemList, setItemList] = useState<ListItem[]>([]);
  const [form, setForm] = useState<string>("");


  const [filtersState, setFilter] = useState<Filters>({active: true, complete: true});


  // Load JSON from local storage
  useEffect(() => {
    // Active toggle
    const localTasks = window.localStorage.getItem('tasks');
    localTasks && setItemList(JSON.parse(localTasks));
    // Compelte task toggle
    
  }, []);

  // Watch task state for updates
  const initialRender = useRef(true);

  
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
    window.localStorage.setItem('tasks', JSON.stringify(itemList));
    console.log("Setting state to: ", itemList)
  }
  }, [itemList]);

  const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // listItem.map creates new list of ids, then compares them.
    const maxNumber: number = Math.max(
      ...itemList.map((item: ListItem) => item.id)
    );
    console.log(itemList);

    setItemList((prevItems) => [
      ...prevItems,
      {
        id: itemList.length === 0 ? 0 : maxNumber + 1,
        title: form === "" ? "No Title" : form,
        completed: false,
        editing: false,
        date: new Date().toJSON(),
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
    setItemList((currentList) => currentList.filter((item) => item.id !== id));
  };

  const completeItem = (
    id: number,
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    // Set item when ID is the same. Otherwise just replace with the same item.
    setItemList((currentList) =>
      currentList.map((item) =>
        item.id === id ? { ...item, completed: true } : item
      )
    );
  };

  const editItem = (
    id: number,
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    // Also could be React.FormEvent<HTMLButtonElement>
    event.preventDefault();
    setItemList((currentList) =>
      currentList.map((item) =>
        item.id === id ? { ...item, editing: !item.editing } : item
      )
    );
    // Enable text input form that repalces the p with a text input, onsubmit updates the object
  };

  const setEdit = (
    id: number,
    event: {
      target: { value: React.SetStateAction<string> };
    }
  ) => {
    // Below seems like a bad idea.
    const input: string = String(event.target.value);
    console.log(input);

    setItemList((currentList) =>
      currentList.map((item) =>
        item.id === id ? { ...item, title: input } : item
      )
    );
  };

  return (
    <div className="App">
      <form onSubmit={handleClick}>
        <div className="grid gap-6 mb-6 md:grid-cols-3 pt-7 px-8">
          <label className="py-4 text-xl font-bold">Input your Task</label>
          <input
            className="border py-2 text-3xl border-gray-300"
            value={form}
            onChange={updateFormState}
            type="text"
          ></input>
          <button
            className="rounded-lg py-4 text-white bg-lime-400 hover:bg-lime-600 active:bg-lime-700 focus:outline-none focus:ring focus:ring-lime-300 text-lg text-black-900"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
      <div>
       <CheckBoxFilters filtersState={filtersState} setFilter={setFilter}></CheckBoxFilters>
        
      </div>
      <div>
        {itemList && // Check is to show only completed tasks or active tasks, or both. Use the flip of the complete property to determine if task is active... As this does not modify the state IDs are still protected.
          itemList
            .filter(
              (obj) =>
                (obj.completed && filtersState.complete == true) ||
                (!obj.completed && filtersState.active == true)
            )
            .map((item) => (
              <div
                className="container mx-auto border-2 px-4 mb-7 rounded-lg border-black-100 bg-lime-200"
                key={item.id}
              >
                {item.editing === false ? (
                  // if item is complete, you are not able to click on it to edit it.
                  <p
                    onClick={
                      item.completed
                        ? undefined
                        : (event) => editItem(item.id, event)
                    }
                    className="text-xl m-7"
                    style={
                      item.completed
                        ? { textDecoration: "line-through" }
                        : { textDecoration: "none" }
                    }
                  >
                    {item.title}
                  </p>
                ) : (
                  <form onSubmit={(event) => editItem(item.id, event)}>
                    <input
                      className="border py-2 text-3xl border-gray-300 "
                      value={item.title}
                      onChange={(event) => setEdit(item.id, event)}
                      type="text"
                    ></input>
                  </form>
                )}
                <form>
                  <div className="grid gap-20 grid-cols-3">
                    <button
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={() => delteItem(item.id)}
                      type="button"
                    >
                      Remove
                    </button>
                    <button
                      className={
                        item.completed
                          ? "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-not-allowed opacity-50"
                          : "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      }
                      onClick={(event) => completeItem(item.id, event)}
                    >
                      Completed
                    </button>
                    <button
                      className={
                        item.completed
                          ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-not-allowed opacity-50"
                          : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      }
                      onClick={
                        item.completed
                          ? (event) => event.preventDefault()
                          : (event) => editItem(item.id, event)
                      }
                    >
                      Edit
                    </button>
                  </div>
                </form>
                <div className="grid grid-cols-4">
                  <p className="italic text-gray-500">Task number: {item.id}</p>
                  <p className="italic text-gray-500">Date: {item.date}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default App;
