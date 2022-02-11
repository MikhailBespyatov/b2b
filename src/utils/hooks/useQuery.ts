export const useQuery = () => {
  const search = new URLSearchParams(window.location.search);

  const toQueryString = (params: any) => {
    return new URLSearchParams(params).toString();
  };

  return { search, toQueryString };
};
