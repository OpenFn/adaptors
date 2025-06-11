export function responseWithPagination(data, nextPage) {
  return {
    body: {
      data,
      next_page: nextPage,
    },
  };
}

export function responseWithData(data) {
  return {
    body: {
      data,
    },
  };
}
