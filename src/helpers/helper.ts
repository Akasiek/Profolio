export const setPage = (page: number) => {
  const url = new URL(window.location.href);
  url.searchParams.set('page', page.toString());
  window.history.pushState({}, '', url.toString());
};
