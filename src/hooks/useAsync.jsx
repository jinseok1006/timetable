import React, { useReducer, useContext, useEffect } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useAsync(callback, deps, skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data });
    } catch (error) {
      dispatch({ type: 'ERROR', error });
    }
  };

  useEffect(() => {
    if (skip) return;

    fetchData();
  }, deps);

  return [state, fetchData];
}

export default useAsync;

export function AsyncComponent({ children, state }) {
  const { loading, error, data } = state;

  if (loading) {
    return <div>로딩중...</div>;
  }
  if (error) {
    return <div>에러발생!</div>;
  }
  if (!data) return null;

  return { children };
}
