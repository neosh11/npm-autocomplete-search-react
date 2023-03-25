# npm-autocomplete-search-react

<p>
<img src="https://img.shields.io/pypi/wheel/pip?color=green&label=es6"/>
<img src="https://img.shields.io/pypi/wheel/pip?color=green&label=React"/>
<img src="https://img.shields.io/pypi/wheel/pip?color=green&label=React-Native"/>

<img src="https://img.shields.io/bundlephobia/min/autocomplete-search-react/0.2.0"/>
<img src="https://img.shields.io/bundlephobia/minzip/autocomplete-search-react/0.2.0"/>
<img src="https://img.shields.io/npm/v/autocomplete-search-react"/>

<img src="https://img.shields.io/twitter/follow/IGrowNeo?style=social"/>

</p>

## Overview

`useSearch` is a custom React hook that provides autocomplete search functionality for an array of objects using the `String2ObjectAutoCompleteSearch` class from the [`@neosh11/autocomplete-search`](https://github.com/neosh11/npm-autocomplete) package. The hook filters the data based on a given search key and manages search text and filtered results internally.

### Example -> [Link](http://neosh11.github.io/Linker/)

| Function                                       | Time                                                                      |
| ---------------------------------------------- | ------------------------------------------------------------------------- |
| `insert(word: string, id: string)`             | `O(m)`, where m is the length of the word being inserted.                 |
| `findWords(prefix: string, maxCount?: number)` | `O(k + n)`, where n is the number of nodes, k is the lenght of the prefix |

## Why use this and not a simple filter?

We tested out a simple filter on 100,000 tokens on the browser and these were the results:

| Method             | Time (ms) |
| ------------------ | --------- |
| Simple filter      | 467       |
| autoCompleteSearch | 4         |

If you want your results to instantly load as you're typing with a lot of data, this library will be a life saver!

## Usage

### install

```
# if using yarn
yarn add autocomplete-search-react

# if using npm
npm install autocomplete-search-react
```

### Importing the module

```ts
import { useSearch } from 'autocomplete-search-react';
```

### Usage

```ts
const data = [
  // your array of objects
];

const searchId = 'id'; // the property that will act as an ID
const searchKey = 'name'; // The property to search for in the objects
// or we can also use a function to map things
const searchFunction = (d) => d.title + d.description; // The property to search for in the objects
const maxResults = 10; // Maximum number of results to display
const tokeniser = ' '; // what to use to split the strings -> default is ' ', can be a RegExp
const [onTextChange, filteredObjects, searchText] = useSearch({
  data: data
  searchId: searchId;
  searchKey: searchKey; // or function searchFunction
  maxResults: maxResults;
  tokenizer: tokeniser // or it can be regex - optional -> default is ' '
});
```

### Example

```ts
function App() {
  const [onTextChange, filteredObjects, searchText] = useSearch({
  data: data
  searchId: 'id';
  searchKey: 'name'; // or function searchFunction
  maxResults: 10;
  tokenizer: ', ' // or it can be regex - optional -> default is ' '
});

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Search"
      />
      <ul>
        {filteredObjects.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

This example demonstrates a simple search feature for a list of objects with name property. The search is case-insensitive and will display up to 10 results.
