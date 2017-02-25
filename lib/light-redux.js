export default (reducer, state = reducer(undefined, { type: "@@INIT" })) => {
  const subscribers = new Set()
  return {
    dispatch: (action) => {
      state = reducer(state, action)
      subscribers.forEach(func => func())
    },
    subscribe: (func) => {
      subscribers.add(func)
      return () => subscribers.delete(func)
    },
    getState: () => state
  }
}
