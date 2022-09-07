import { GET_BLOG, GET_BLOGS } from '../actions/types'
const initialState = {
    blog: [],
    blogs: null,
    loading: true
}


export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_BLOG:
            return {
                ...state,
                blog: payload,
                loading: false
            }
        case GET_BLOGS:
            return {
                ...state,
                blogs: payload,
                loading: false
            }
        default:
            return state;
    }
}