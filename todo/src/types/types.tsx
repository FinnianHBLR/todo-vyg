export interface Filters {
    active: boolean;
    complete: boolean;
  }

export interface ListItem {
    id: number;
    title: string;
    completed: boolean;
    editing: boolean;
    date: string;
  }