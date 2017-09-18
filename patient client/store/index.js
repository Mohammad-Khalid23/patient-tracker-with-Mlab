import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import patient from './reducers/patient.js'

const middleware = applyMiddleware(thunk);
let store = createStore(
    patient,
    middleware
)
store.subscribe(() => {
    console.log(store.getState(),"store value")
})
export default store;