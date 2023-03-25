import { useEffect, useMemo, useState } from 'react';
import { String2ObjectAutoCompleteSearch } from '@neosh11/autocomplete-search';

export function useSearch({
  data,
  searchId,
  searchKey,
  maxResults,
  tokenizer,
}: {
  data: any[];
  searchId: string;
  searchKey: string | ((arg0: any) => string);
  maxResults: number;
  tokenizer?: RegExp | string;
}) {
  const [searchText, setSearchText] = useState('');

  const autoCompleteSearch = useMemo(() => {
    const searchOptions = {
      ignoreCase: true,
      objectIdProperty: searchId || 'id',
      tokenizer: tokenizer || ' ',
    };
    return new String2ObjectAutoCompleteSearch(searchOptions);
  }, [searchId, tokenizer]);

  useEffect(() => {
    autoCompleteSearch.clear();
    // fill autoCompleteSearch
    data.forEach((d) => {
      const searchString = typeof searchKey === 'function' ? searchKey(d) : d[searchKey];
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
