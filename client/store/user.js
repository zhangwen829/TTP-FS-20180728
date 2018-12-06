import axios from 'axios';
import history from '../history';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';


const defaultUser = {};

const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});


export const me = () => dispatch =>
    axios.get('/auth/me')
        .then(res => {
          dispatch(getUser(res.data || defaultUser));
          if (res.data) {
            history.push('/portfolio');
          }
        })
        .catch(err => console.error(err));

export const auth = (email, password, name, method) => dispatch =>
    axios.post(`/auth/${method}`, {email, password, name})
        .then(
            res => {
              dispatch(getUser(res.data));
              history.push('/portfolio');
            },
            authError => { dispatch(getUser({error: authError}));})
        .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));

export const logout = () => dispatch => axios.post('/auth/logout')
                                            .then(_ => {
                                              dispatch(removeUser());
                                              history.push('/login');
                                            })
                                            .catch(err => console.error(err));


export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}