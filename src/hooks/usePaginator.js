/** @format */

import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';

function usePaginator ({ query, queryName }) {
  const [
    {
      data,
      nextToken,
      status,
      limit,
      nextLimit,
      page,
      maxPageReached,
      totalCount,
      refresh
    },
    setState
  ] = React.useState({
    data: null,
    nextToken: null,
    status: 'initial',
    limit: 10,
    nextLimit: null,
    page: -1,
    maxPageReached: -1,
    totalCount: 0,
    refresh: false
  });

  const fetchData = React.useCallback(async () => {
    try {
      setState(oldState => ({
        ...oldState,
        status: 'fetching'
      }));

      const {
        data: { [queryName]: result }
      } = await API.graphql(
        graphqlOperation(query, {
          limit: nextLimit || limit,
          nextToken: refresh ? null : nextToken
        })
      );

      setState(oldState => {
        const currentPage = oldState.refresh ? -1 : oldState.page;
        const newPage = currentPage + 1;

        return {
          ...oldState,
          status: 'fetchSuccess',
          data: (currentPage === -1 ? [] : oldState.data || []).concat(result.items),
          nextToken: result.nextToken,
          page: newPage,
          maxPageReached: newPage,
          totalCount: oldState.totalCount || result.total,
          refresh: false,
          nextLimit: null,
          limit: oldState.nextLimit || oldState.limit
        };
      });
    } catch (error) {
      console.log(error);

      setState(oldState => ({
        ...oldState,
        status: 'fetchError'
      }));
    }
  }, [nextToken, limit, nextLimit, refresh, query, queryName]);

  const refreshData = React.useCallback(() => {
    setState(oldState => ({
      ...oldState,
      status: 'initial',
      refresh: true
    }));
  }, []);

  const setLimit = React.useCallback(value => {
    setState(oldState => ({
      ...oldState,
      status: 'initial',
      nextLimit: value,
      refresh: true
    }));
  }, []);

  const setPage = React.useCallback(
    value => {
      if (value > page && value > maxPageReached) {
        fetchData();
      } else {
        setState(oldState => ({
          ...oldState,
          page: value
        }));
      }
    },
    [page, fetchData, maxPageReached]
  );

  React.useEffect(() => {
    if (status === 'initial') fetchData();
  }, [status, fetchData]);

  return {
    data,
    status,
    limit,
    page,
    totalCount,
    refresh,
    isFetching: status === 'fetching',
    setPage,
    setLimit,
    fetchData,
    refreshData
  };
}

export default usePaginator;
