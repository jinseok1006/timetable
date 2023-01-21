import React, { createContext, useReducer, useContext } from 'react';

// 비동기 요청 경로는 2개인데 한개의 상태에서 공유함

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const loadingState = {
  loading: true,
  data: null,
  error: null,
};

const success = (data) => ({
  loading: false,
  data,
  error: null,
});

const error = (error) => ({
  loading: false,
  data: null,
  error,
});

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return loadingState;
    case 'SUCCESS':
      return success(action.data);
    case 'ERROR':
      return error(action.error);
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}

function cartReducer(cart, action) {
  switch (action.type) {
    case 'ADD':
      return [...cart, action.lecture];
    case 'DELETE':
      return cart.filter((lecture, id) => id !== action.id);
    default:
      throw new Error(`unhandled action type ${action.type}`);
  }
}

const CartStateContext = createContext(null);
const CartDispatchContext = createContext(null);

const LectureStateContext = createContext(null);
const LectureActionHandlerContext = createContext(null);

export default function LectureProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cart, cartDispath] = useReducer(cartReducer, []);

  async function actionHandler(callback, ...rest) {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback(...rest);

      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  }

  return (
    <LectureStateContext.Provider value={state}>
      <LectureActionHandlerContext.Provider value={actionHandler}>
        <CartDispatchContext.Provider value={cartDispath}>
          <CartStateContext.Provider value={cart}>
            {children}
          </CartStateContext.Provider>
        </CartDispatchContext.Provider>
      </LectureActionHandlerContext.Provider>
    </LectureStateContext.Provider>
  );
}

export function useLectureState() {
  const state = useContext(LectureStateContext);

  if (!state) {
    throw new Error('Cannot find LectureStateContext');
  }

  return state;
}

export function useLectureActionHandler() {
  const actionHandler = useContext(LectureActionHandlerContext);
  if (!actionHandler) {
    throw new Error('Cannot find LectureProvider');
  }
  return actionHandler;
}

export function useCartDispatch() {
  const cartDispatch = useContext(CartDispatchContext);
  if (!cartDispatch) {
    throw new Error('cannot find LectureProvider');
  }
  return cartDispatch;
}

export function useCartState() {
  const cart = useContext(CartStateContext);
  if (!cart) {
    throw new Error('cannot find LectureProvider');
  }
  return cart;
}
