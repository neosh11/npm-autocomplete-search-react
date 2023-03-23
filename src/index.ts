import { useEffect, useMemo, useState } from 'react';
import { String2ObjectAutoCompleteSearch } from '@neosh11/autocomplete-search';

export function useSearch(p: {
  data: any[];
  searchId: string;
  searchKey: string | ((arg0: any) => string);
  maxResults: number;
  tokenizer?: RegExp | string;
}) {
  const [searchText, setSearchText] = useState('');
  const [filteredObjects, setFilteredObjects] = useState(p.data);
  const autoCompleteSearch = useMemo(() => {
    const searchOptions = {
      ignoreCase: true,
      objectIdProperty: p.searchId || 'id',
      tokenizer: p.tokenizer || ' ',
    };
    return new String2ObjectAutoCompleteSearch(searchOptions);
  }, [p.searchId, p.tokenizer]);
  useEffect(() => {
    autoCompleteSearch.clear();
    // fill autoCompleteSearch
    p.data.forEach((d) => {
      const searchString = typeof p.searchKey === 'function' ? p.searchKey(d) : d[p.searchKey];
      autoCompleteSearch.insert(searchString, d);
    });

    if (searchText === '') {
      setFilteredObjects(p.data);
    } else {
      setFilteredObjects(autoCompleteSearch.findObjects(searchText, p.maxResults));
    }
    // set initial filtered objects
  }, [autoCompleteSearch, p, p.data, p.maxResults, p.searchKey, searchText]);
  const onTextChange = (val: string) => {
    if (val === '') {
      setFilteredObjects(p.data);
      setSearchText(val);
    } else {
      setFilteredObjects(autoCompleteSearch.findObjects(val, p.maxResults));
      setSearchText(val);
    }
  };
  return [onTextChange, filteredObjects, searchText] as const;
}
