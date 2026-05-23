"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { useSupabase } from "../../../../hooks/useSupabase";
import SearchResults from "@/components/SearchResults";
import { resolveNavQuery } from "@/lib/navCategories";

const SearchPage = () => {
  const { query } = useParams();
  const { filterData, getFilteredData } = useSupabase();

  const searchQuery = useMemo(() => {
    if (!query) return "";
    return Array.isArray(query) ? query[0] : query;
  }, [query]);

  const categoryInfo = useMemo(
    () => (searchQuery ? resolveNavQuery(searchQuery) : null),
    [searchQuery],
  );

  useEffect(() => {
    if (!searchQuery) return;
    getFilteredData(searchQuery);
  }, [getFilteredData, searchQuery]);

  return (
    <SearchResults
      filterData={filterData}
      categoryLabel={categoryInfo?.label}
    />
  );
};

export default SearchPage;
