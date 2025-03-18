import { API_ENDPOINTS } from "../apiConfig"
import axiosInstance from "./axios"

export const createTicket = async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.TICKET.CREATE_TICKET, data)
    return response.data
}

export const getTickets = async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.TICKET.GET_TICKETS)
    return response.data
}