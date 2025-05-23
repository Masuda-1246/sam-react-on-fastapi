/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * FastAPI React Backend
 * OpenAPI spec version: 0.1.0
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import * as axios from 'axios';
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

import type {
  DeleteTodoApiTodosTodoIdDelete200,
  HTTPValidationError,
  HealthCheckApiHealthGet200,
  TodoCreate,
  TodoResponse,
  TodoUpdate
} from '../model';





/**
 * すべてのTodoアイテムを取得する
 * @summary Get Todos
 */
export const getTodosApiTodosGet = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<TodoResponse[]>> => {
    
    
    return axios.default.get(
      `/api/todos`,options
    );
  }


export const getGetTodosApiTodosGetQueryKey = () => {
    return [`/api/todos`] as const;
    }

    
export const getGetTodosApiTodosGetQueryOptions = <TData = Awaited<ReturnType<typeof getTodosApiTodosGet>>, TError = AxiosError<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTodosApiTodosGet>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTodosApiTodosGetQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTodosApiTodosGet>>> = ({ signal }) => getTodosApiTodosGet({ signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getTodosApiTodosGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetTodosApiTodosGetQueryResult = NonNullable<Awaited<ReturnType<typeof getTodosApiTodosGet>>>
export type GetTodosApiTodosGetQueryError = AxiosError<unknown>


export function useGetTodosApiTodosGet<TData = Awaited<ReturnType<typeof getTodosApiTodosGet>>, TError = AxiosError<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTodosApiTodosGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getTodosApiTodosGet>>,
          TError,
          Awaited<ReturnType<typeof getTodosApiTodosGet>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetTodosApiTodosGet<TData = Awaited<ReturnType<typeof getTodosApiTodosGet>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTodosApiTodosGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getTodosApiTodosGet>>,
          TError,
          Awaited<ReturnType<typeof getTodosApiTodosGet>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetTodosApiTodosGet<TData = Awaited<ReturnType<typeof getTodosApiTodosGet>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTodosApiTodosGet>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get Todos
 */

export function useGetTodosApiTodosGet<TData = Awaited<ReturnType<typeof getTodosApiTodosGet>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTodosApiTodosGet>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetTodosApiTodosGetQueryOptions(options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * 新しいTodoアイテムを作成する
 * @summary Create Todo
 */
export const createTodoApiTodosPost = (
    todoCreate: TodoCreate, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<TodoResponse>> => {
    
    
    return axios.default.post(
      `/api/todos`,
      todoCreate,options
    );
  }



export const getCreateTodoApiTodosPostMutationOptions = <TError = AxiosError<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createTodoApiTodosPost>>, TError,{data: TodoCreate}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof createTodoApiTodosPost>>, TError,{data: TodoCreate}, TContext> => {

const mutationKey = ['createTodoApiTodosPost'];
const {mutation: mutationOptions, axios: axiosOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, axios: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createTodoApiTodosPost>>, {data: TodoCreate}> = (props) => {
          const {data} = props ?? {};

          return  createTodoApiTodosPost(data,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type CreateTodoApiTodosPostMutationResult = NonNullable<Awaited<ReturnType<typeof createTodoApiTodosPost>>>
    export type CreateTodoApiTodosPostMutationBody = TodoCreate
    export type CreateTodoApiTodosPostMutationError = AxiosError<HTTPValidationError>

    /**
 * @summary Create Todo
 */
export const useCreateTodoApiTodosPost = <TError = AxiosError<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createTodoApiTodosPost>>, TError,{data: TodoCreate}, TContext>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof createTodoApiTodosPost>>,
        TError,
        {data: TodoCreate},
        TContext
      > => {

      const mutationOptions = getCreateTodoApiTodosPostMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    
/**
 * 指定したIDのTodoアイテムを取得する
 * @summary Get Todo
 */
export const getTodoApiTodosTodoIdGet = (
    todoId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<TodoResponse>> => {
    
    
    return axios.default.get(
      `/api/todos/${todoId}`,options
    );
  }


export const getGetTodoApiTodosTodoIdGetQueryKey = (todoId: string,) => {
    return [`/api/todos/${todoId}`] as const;
    }

    
export const getGetTodoApiTodosTodoIdGetQueryOptions = <TData = Awaited<ReturnType<typeof getTodoApiTodosTodoIdGet>>, TError = AxiosError<HTTPValidationError>>(todoId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTodoApiTodosTodoIdGet>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTodoApiTodosTodoIdGetQueryKey(todoId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTodoApiTodosTodoIdGet>>> = ({ signal }) => getTodoApiTodosTodoIdGet(todoId, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(todoId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getTodoApiTodosTodoIdGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetTodoApiTodosTodoIdGetQueryResult = NonNullable<Awaited<ReturnType<typeof getTodoApiTodosTodoIdGet>>>
export type GetTodoApiTodosTodoIdGetQueryError = AxiosError<HTTPValidationError>


export function useGetTodoApiTodosTodoIdGet<TData = Awaited<ReturnType<typeof getTodoApiTodosTodoIdGet>>, TError = AxiosError<HTTPValidationError>>(
 todoId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTodoApiTodosTodoIdGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getTodoApiTodosTodoIdGet>>,
          TError,
          Awaited<ReturnType<typeof getTodoApiTodosTodoIdGet>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetTodoApiTodosTodoIdGet<TData = Awaited<ReturnType<typeof getTodoApiTodosTodoIdGet>>, TError = AxiosError<HTTPValidationError>>(
 todoId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTodoApiTodosTodoIdGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getTodoApiTodosTodoIdGet>>,
          TError,
          Awaited<ReturnType<typeof getTodoApiTodosTodoIdGet>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetTodoApiTodosTodoIdGet<TData = Awaited<ReturnType<typeof getTodoApiTodosTodoIdGet>>, TError = AxiosError<HTTPValidationError>>(
 todoId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTodoApiTodosTodoIdGet>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get Todo
 */

export function useGetTodoApiTodosTodoIdGet<TData = Awaited<ReturnType<typeof getTodoApiTodosTodoIdGet>>, TError = AxiosError<HTTPValidationError>>(
 todoId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTodoApiTodosTodoIdGet>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetTodoApiTodosTodoIdGetQueryOptions(todoId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * 指定したIDのTodoアイテムを更新する
 * @summary Update Todo
 */
export const updateTodoApiTodosTodoIdPut = (
    todoId: string,
    todoUpdate: TodoUpdate, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<TodoResponse>> => {
    
    
    return axios.default.put(
      `/api/todos/${todoId}`,
      todoUpdate,options
    );
  }



export const getUpdateTodoApiTodosTodoIdPutMutationOptions = <TError = AxiosError<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateTodoApiTodosTodoIdPut>>, TError,{todoId: string;data: TodoUpdate}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof updateTodoApiTodosTodoIdPut>>, TError,{todoId: string;data: TodoUpdate}, TContext> => {

const mutationKey = ['updateTodoApiTodosTodoIdPut'];
const {mutation: mutationOptions, axios: axiosOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, axios: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateTodoApiTodosTodoIdPut>>, {todoId: string;data: TodoUpdate}> = (props) => {
          const {todoId,data} = props ?? {};

          return  updateTodoApiTodosTodoIdPut(todoId,data,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UpdateTodoApiTodosTodoIdPutMutationResult = NonNullable<Awaited<ReturnType<typeof updateTodoApiTodosTodoIdPut>>>
    export type UpdateTodoApiTodosTodoIdPutMutationBody = TodoUpdate
    export type UpdateTodoApiTodosTodoIdPutMutationError = AxiosError<HTTPValidationError>

    /**
 * @summary Update Todo
 */
export const useUpdateTodoApiTodosTodoIdPut = <TError = AxiosError<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateTodoApiTodosTodoIdPut>>, TError,{todoId: string;data: TodoUpdate}, TContext>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof updateTodoApiTodosTodoIdPut>>,
        TError,
        {todoId: string;data: TodoUpdate},
        TContext
      > => {

      const mutationOptions = getUpdateTodoApiTodosTodoIdPutMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    
/**
 * 指定したIDのTodoアイテムを削除する
 * @summary Delete Todo
 */
export const deleteTodoApiTodosTodoIdDelete = (
    todoId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<DeleteTodoApiTodosTodoIdDelete200>> => {
    
    
    return axios.default.delete(
      `/api/todos/${todoId}`,options
    );
  }



export const getDeleteTodoApiTodosTodoIdDeleteMutationOptions = <TError = AxiosError<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteTodoApiTodosTodoIdDelete>>, TError,{todoId: string}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof deleteTodoApiTodosTodoIdDelete>>, TError,{todoId: string}, TContext> => {

const mutationKey = ['deleteTodoApiTodosTodoIdDelete'];
const {mutation: mutationOptions, axios: axiosOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, axios: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteTodoApiTodosTodoIdDelete>>, {todoId: string}> = (props) => {
          const {todoId} = props ?? {};

          return  deleteTodoApiTodosTodoIdDelete(todoId,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteTodoApiTodosTodoIdDeleteMutationResult = NonNullable<Awaited<ReturnType<typeof deleteTodoApiTodosTodoIdDelete>>>
    
    export type DeleteTodoApiTodosTodoIdDeleteMutationError = AxiosError<HTTPValidationError>

    /**
 * @summary Delete Todo
 */
export const useDeleteTodoApiTodosTodoIdDelete = <TError = AxiosError<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteTodoApiTodosTodoIdDelete>>, TError,{todoId: string}, TContext>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteTodoApiTodosTodoIdDelete>>,
        TError,
        {todoId: string},
        TContext
      > => {

      const mutationOptions = getDeleteTodoApiTodosTodoIdDeleteMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    
/**
 * @summary Health Check
 */
export const healthCheckApiHealthGet = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<HealthCheckApiHealthGet200>> => {
    
    
    return axios.default.get(
      `/api/health`,options
    );
  }


export const getHealthCheckApiHealthGetQueryKey = () => {
    return [`/api/health`] as const;
    }

    
export const getHealthCheckApiHealthGetQueryOptions = <TData = Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError = AxiosError<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getHealthCheckApiHealthGetQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof healthCheckApiHealthGet>>> = ({ signal }) => healthCheckApiHealthGet({ signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type HealthCheckApiHealthGetQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheckApiHealthGet>>>
export type HealthCheckApiHealthGetQueryError = AxiosError<unknown>


export function useHealthCheckApiHealthGet<TData = Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError = AxiosError<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof healthCheckApiHealthGet>>,
          TError,
          Awaited<ReturnType<typeof healthCheckApiHealthGet>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useHealthCheckApiHealthGet<TData = Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof healthCheckApiHealthGet>>,
          TError,
          Awaited<ReturnType<typeof healthCheckApiHealthGet>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useHealthCheckApiHealthGet<TData = Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Health Check
 */

export function useHealthCheckApiHealthGet<TData = Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getHealthCheckApiHealthGetQueryOptions(options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Serve React App
 */
export const serveReactAppFullPathGet = (
    fullPath: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    
    
    return axios.default.get(
      `/${fullPath}`,options
    );
  }


export const getServeReactAppFullPathGetQueryKey = (fullPath: string,) => {
    return [`/${fullPath}`] as const;
    }

    
export const getServeReactAppFullPathGetQueryOptions = <TData = Awaited<ReturnType<typeof serveReactAppFullPathGet>>, TError = AxiosError<HTTPValidationError>>(fullPath: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof serveReactAppFullPathGet>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getServeReactAppFullPathGetQueryKey(fullPath);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof serveReactAppFullPathGet>>> = ({ signal }) => serveReactAppFullPathGet(fullPath, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(fullPath), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof serveReactAppFullPathGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ServeReactAppFullPathGetQueryResult = NonNullable<Awaited<ReturnType<typeof serveReactAppFullPathGet>>>
export type ServeReactAppFullPathGetQueryError = AxiosError<HTTPValidationError>


export function useServeReactAppFullPathGet<TData = Awaited<ReturnType<typeof serveReactAppFullPathGet>>, TError = AxiosError<HTTPValidationError>>(
 fullPath: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof serveReactAppFullPathGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof serveReactAppFullPathGet>>,
          TError,
          Awaited<ReturnType<typeof serveReactAppFullPathGet>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useServeReactAppFullPathGet<TData = Awaited<ReturnType<typeof serveReactAppFullPathGet>>, TError = AxiosError<HTTPValidationError>>(
 fullPath: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof serveReactAppFullPathGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof serveReactAppFullPathGet>>,
          TError,
          Awaited<ReturnType<typeof serveReactAppFullPathGet>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useServeReactAppFullPathGet<TData = Awaited<ReturnType<typeof serveReactAppFullPathGet>>, TError = AxiosError<HTTPValidationError>>(
 fullPath: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof serveReactAppFullPathGet>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Serve React App
 */

export function useServeReactAppFullPathGet<TData = Awaited<ReturnType<typeof serveReactAppFullPathGet>>, TError = AxiosError<HTTPValidationError>>(
 fullPath: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof serveReactAppFullPathGet>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getServeReactAppFullPathGetQueryOptions(fullPath,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




