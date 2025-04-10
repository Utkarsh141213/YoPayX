import axios from "axios"
import { API_ENDPOINTS, TRAVEL_API_BASE_URL } from "../../../apiConfig"

export const getFlightSearchsuggestions = async (params) => {
    const res = await axios.get(`${TRAVEL_API_BASE_URL}${API_ENDPOINTS.TRAVEL.FLIGHT.SEARCH_SUGGESTION}`, { params })
    return res.data
}

export const getFlightList = async (params) => {
    const res = await axios.post(`${TRAVEL_API_BASE_URL}${API_ENDPOINTS.TRAVEL.FLIGHT.SEARCH_FLIGHT}`, params )
    return res.data
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

