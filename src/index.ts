import { useEffect, useMemo, useState } from 'react';
import { String2ObjectAutoCompleteSearch } from '@neosh11/autocomplete-search';

export function useSearch(data: any[], searchKey: string | ((arg0: any) => string), maxResults: number) {
  const [searchText, setSearchText] = useState('');
  const [filteredObjects, setFilteredObjects] = useState(data);
  const autoCompleteSearch = useMemo(() => {
    const searchOptions = {
      ignoreCase: true,
      objectIdProperty: 'id',
      tokenizer: ' ',
    };
    return new String2ObjectAutoCompleteSearch(searchOptions);
  }, []);
  useEffect(() => {
    autoCompleteSearch.clear();
    // fill autoCompleteSearch
    data.forEach((d) => {
      const searchString = typeof searchKey === 'function' ? searchKey(d) : d[searchKey];
      autoCompleteSearch.insert(searchString, d);
    });

    if (searchText === '') {
      setFilteredObjects(data);
    } else {
      setFilteredObjects(autoCompleteSearch.findObjects(searchText, maxResults));
    }
    // set initial filtered objects
  }, [autoCompleteSearch, data, maxResults, searchKey, searchText]);
  const onTextChange = (val: string) => {
    if (val === '') {
      setFilteredObjects(data);
      setSearchText(val);
    } else {
      setFilteredObjects(autoCompleteSearch.findObjects(val, maxResults));
      setSearchText(val);
    }
  };
  return [onTextChange, filteredObjects, searchText] as const;
}
