import React, { useEffect, useState } from 'react';
import { FaPlus, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getTickets } from '../services/ticketAPI';

const Ticket = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState();
  const [loading, setLoading] = useState(true);

  // Fetch ticket data when the component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await getTickets();
        if (response && response.data) {
          setTickets(response.data);
        }
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  // Navigate to the create ticket page
  const handleCreateTicket = () => {
    navigate('/create-ticket');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* Page Title and Create Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">My Tickets</h1>
          <div
            onClick={handleCreateTicket}
            className="bg-[#4BAF2A] hover:bg-green-600 cursor-pointer text-white px-4 py-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> New Ticket
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin inline-block w-10 h-10 border-4 border-t-blue-500 border-r-transparent rounded-full"></div>
            <p className="mt-4 text-lg">Loading tickets...</p>
          </div>
        ) : tickets.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12 bg-gray-900 rounded-lg">
            <p className="text-xl">No Tickets Available</p>
            <p className="text-gray-400 mt-2">Click "New Ticket" to create one.</p>
          </div>
        ) : (
          /* Table Design */
          <div className="overflow-x-auto">
            <table className="w-full bg-[#FFFFFF16] text-left rounded-lg">
              {/* Table Headers */}
              <thead className='border-b-2'>
                <tr className="bg-neutral-800 text-gray-300 uppercase text-sm">
                  <th className="px-6 py-4">Create Date</th>
                  <th className="px-6 py-4">Ticket Number</th>
                  <th className="px-6 py-4">Ticket Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Update Date</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody className="divide-y divide-gray-600 text-center">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-neutral-800">
                    <td className="px-6 py-4">{formatDate(ticket.ticket_category.created_at)}</td>
                    <td className="px-6 py-4">{ticket.number}</td>
                    <td className="px-6 py-4">{ticket.ticket_category?.name}</td>
                    <td className="px-6 py-4">
                      {ticket.status ? (
                        <span className="flex items-center text-green-400">
                          {/* <FaCheckCircle className="mr-2" />  */}
                          Resolved
                        </span>
                      ) : (
                        <span className="flex items-center text-yellow-400">
                          {/* <FaTimesCircle className="mr-2" />  */}
                          Open
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">{formatDate(ticket.ticket_category.updated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ticket;