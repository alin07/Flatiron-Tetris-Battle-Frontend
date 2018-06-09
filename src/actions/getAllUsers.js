import { GET_ALL_USERS_BY_IDS } from './types'
import axios from 'axios'

export default function getAllUsersByIds() {
  return dispatch => {
    console.log('getting users by ids async', res.data)
    const params = res.data


  }
}

const getAllUsersByIdsAsync = (rooms) => {

  return {
    type: GET_ALL_USERS_BY_IDS,
    payload: rooms
  }
}
