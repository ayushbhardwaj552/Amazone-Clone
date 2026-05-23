import { useState, useCallback } from "react";
import { supabase } from "../lib/supabase/products";
import { mockProducts } from "../src/lib/mockProducts";
import { resolveNavQuery } from "../src/lib/navCategories";

function filterProductsLocal(products: typeof mockProducts, terms: string[]) {
  if (!terms.length) return products;
  const lowerTerms = terms.map((t) => t.toLowerCase());
  return products.filter((p) =>
    lowerTerms.some(
      (term) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term),
    ),
  );
}

export const useSupabase = () => {
  const [products, setProducts] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>([]);
  const [singleProduct, setSingleProduct] = useState<any>([]);
  const [mensClothing, setMensClothing] = useState<any>([]);
  const [womenClothing, setWomenClothing] = useState<any>([]);

  const getDataFromSupabase = useCallback(async () => {
    try {
      let { data, error } = await supabase.from(`Products`).select("*");
      if (data && data.length > 0) {
        setProducts(data);
      } else {
        if (error) console.log("Supabase error, falling back to mocks:", error);
        setProducts(mockProducts);
      }
    } catch (e) {
      console.log("Supabase connection failed, falling back to mocks:", e);
      setProducts(mockProducts);
    }
  }, []);

  const getFilteredData = useCallback(async (query: string) => {
    const nav = resolveNavQuery(query);

    if (nav.showAll) {
      try {
        const { data } = await supabase.from(`Products`).select("*");
        if (data?.length) {
          setFilterData(data);
          return;
        }
      } catch {
        /* fallback */
      }
      setFilterData(mockProducts);
      return;
    }

    const terms =
      nav.searchTerms.length > 0 ? nav.searchTerms : [query];

    try {
      const orFilter = terms
        .map(
          (term) =>
            `title.ilike.%${term}%,description.ilike.%${term}%,category.ilike.%${term}%`,
        )
        .join(",");

      const { data, error } = await supabase
        .from(`Products`)
        .select("*")
        .or(orFilter);

      if (data && data.length > 0) {
        setFilterData(data);
      } else {
        if (error) console.log("Supabase error, filtering mocks locally:", error);
        setFilterData(filterProductsLocal(mockProducts, terms));
      }
    } catch (e) {
      console.log("Supabase connection failed, filtering mocks locally:", e);
      setFilterData(filterProductsLocal(mockProducts, terms));
    }
  }, []);

  const getProductsById = useCallback(async (id: number) => {
    try {
      let { data, error } = await supabase
        .from(`Products`)
        .select("*")
        .eq("id", id);

      if (data && data.length > 0) {
        setSingleProduct(data);
      } else {
        if (error) console.log("Supabase error, finding mock by ID:", error);
        const found = mockProducts.filter((p) => p.id === id);
        setSingleProduct(found);
      }
    } catch (e) {
      console.log("Supabase connection failed, finding mock by ID:", e);
      const found = mockProducts.filter((p) => p.id === id);
      setSingleProduct(found);
    }
  }, []);

  const getProductsofMens = useCallback(async () => {
    try {
      let { data, error } = await supabase
        .from(`Products`)
        .select("*")
        .ilike("category", "%men's clothing%");
      if (data && data.length > 0) {
        setMensClothing(data);
      } else {
        if (error) console.log("Supabase error, filtering mens clothing mocks:", error);
        const mens = mockProducts.filter((p) =>
          p.category.toLowerCase().includes("men's clothing"),
        );
        setMensClothing(mens);
      }
    } catch (e) {
      console.log("Supabase connection failed, filtering mens clothing mocks:", e);
      const mens = mockProducts.filter((p) =>
        p.category.toLowerCase().includes("men's clothing"),
      );
      setMensClothing(mens);
    }
  }, []);

  const getProductsofWomen = useCallback(async () => {
    try {
      let { data, error } = await supabase
        .from(`Products`)
        .select("*")
        .ilike("category", "%women's clothing%");
      if (data && data.length > 0) {
        setWomenClothing(data);
      } else {
        if (error) console.log("Supabase error, filtering womens clothing mocks:", error);
        const womens = mockProducts.filter((p) =>
          p.category.toLowerCase().includes("women's clothing"),
        );
        setWomenClothing(womens);
      }
    } catch (e) {
      console.log("Supabase connection failed, filtering womens clothing mocks:", e);
      const womens = mockProducts.filter((p) =>
        p.category.toLowerCase().includes("women's clothing"),
      );
      setWomenClothing(womens);
    }
  }, []);

  return {
    products,
    filterData,
    getDataFromSupabase,
    getFilteredData,
    singleProduct,
    getProductsById,
    getProductsofMens,
    mensClothing,
    getProductsofWomen,
    womenClothing,
  };
};
