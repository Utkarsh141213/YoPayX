import axios from "axios"
import { API_ENDPOINTS, TRAVEL_API_BASE_URL } from "../../../apiConfig"
import axiosTravelInstance from "../axiosConfig"

export const getSearchsuggestions = async (params) => {
    const res = await axios.get(`${TRAVEL_API_BASE_URL}${API_ENDPOINTS.TRAVEL.HOTEL.SEARCH_SUGGESTION}`, { params })
    return res.data
}

export const getHotelList = async (data) => {
    const res = await axios.post(`${TRAVEL_API_BASE_URL}${API_ENDPOINTS.TRAVEL.HOTEL.SEARCH_HOTELS}`, data)
    return res.data.responseData
}

export const getHotelDetails = async (data) => {
    const res = await axios.post(`${TRAVEL_API_BASE_URL}${API_ENDPOINTS.TRAVEL.HOTEL.GET_HOTEL_DETAILS}`, data)
    return res.data.responseData
}

export const checkHotelAvailability = async (data) => {
    const res = await axios.post(`${TRAVEL_API_BASE_URL}${API_ENDPOINTS.TRAVEL.HOTEL.CHECK_HOTEL_AVAILABILITY}`, data)
    return res.data.responseData
}

export const bookHotel = async (data) => {
    const res = await axios.post(`${TRAVEL_API_BASE_URL}${API_ENDPOINTS.TRAVEL.HOTEL.BOOK_HOTEL}`, data)
    return res.data
} 

