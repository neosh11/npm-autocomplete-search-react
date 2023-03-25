import { useEffect, useMemo, useState } from 'react';
import { String2ObjectAutoCompleteSearch } from '@neosh11/autocomplete-search';

// Type is a type of the object that you want to search in
export function useSearch<T>({
  data,
  searchId,
  searchKey,
  maxResults,
  tokenizer,
}: {
  data: T[];
  // type is property of T as a string
  searchId: keyof T;
  searchKey: keyof T | ((arg0: T) => string);
  maxResults: number;
  tokenizer?: RegExp | string;
}) {
  const [searchText, setSearchText] = useState('');

  const autoCompleteSearch = useMemo(() => {
    const searchOptions = {
      ignoreCase: true,
      objectIdProperty: searchId,
      tokenizer: tokenizer || ' ',
    };
    return new String2ObjectAutoCompleteSearch(searchOptions);
  }, [searchId, tokenizer]);

  useEffect(() => {
    autoCompleteSearch.clear();
    // fill autoCompleteSearch
    data.forEach((d) => {
      const searchString = typeof searchKey === 'function' ? searchKey(d) : (d[searchKey] as string);
      autoCompleteSearch.insert(searchString, d);
    });
  }, [autoCompleteSearch, data, searchKey]);

  const onTextChange = (val: string) => {
    setSearchText(val);
  };

  const filteredObjects = useMemo(() => {
    if (searchText === '') {
      return data;
    }
    return autoCompleteSearch.findObjects(searchText, maxResults);
  }, [autoCompleteSearch, searchText, data, maxResults]);

  return [onTextChange, filteredObjects, searchText] as const;
}
