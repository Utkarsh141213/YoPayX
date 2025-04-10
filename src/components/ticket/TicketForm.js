import React, { useState } from 'react';
import logo from "../../assets/yatri-pay-logo-main.png";
import { 
  FaMoneyBillWave, 
  FaExchangeAlt, 
  FaShieldAlt, 
  FaIdCard, 
  FaCoins, 
  FaUserFriends, 
  FaGift, 
  FaQuestionCircle, 
  FaPaperclip, 
} from 'react-icons/fa';
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { createTicket } from '../../services/ticketAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TicketForm = () => {
  const [ticketType, setTicketType] = useState('');
  const [ticket_category, setTicketCategory] = useState();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate()

  const ticketOptions = [
    { id: 3, value: 'deposit', label: 'Deposit', icon: <FaMoneyBillWave /> },
    { id: 4, value: 'withdrawal', label: 'Withdrawal', icon: <FaMoneyBillWave /> },
    { id: 2, value: 'ytp', label: 'YTP Buy/Sell', icon: <FaExchangeAlt /> },
    { id: 6, value: 'twofa', label: 'Two Factor Authentication', icon: <FaShieldAlt /> },
    { id: 5, value: 'kyc', label: 'KYC Verification', icon: <FaIdCard /> },
    { id: 7, value: 'staking', label: 'Staking', icon: <FaCoins /> },
    { id: 10, value: 'referral', label: 'Referral', icon: <FaUserFriends /> },
    { id: 9, value: 'offers', label: 'Offers', icon: <FaGift /> },
    { id: 1, value: 'general', label: 'General Query', icon: <FaQuestionCircle /> },
  ];

  const handleAttachmentChange = (e) => {
    if (e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTicket({
        ticket_category,
        subject,
        message,
        status: false,
        attachment,
      })

      toast.success('Ticket created successfully')
      navigate('/support')
      
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message || 'Error in creating ticket')
    }

    setTicketType('');
    setSubject('');
    setMessage('');
    setAttachment(null);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col justify-center items-center text-left">
      <header>
          <div className="flex flex-col justify-center items-center py-6">
            <img src={logo} alt="logo" className="h-8 md:h-12" />
            <h1 className=''>Create Ticket</h1>
          </div>
        </header>
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        <div className="space-y-2">
          <label className="block text-lg font-medium">Ticket type</label>
          <div className="relative">
            <div 
              className="bg-white text-black rounded-md px-3 py-[10px] flex justify-between items-center cursor-pointer border border-gray-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex items-center gap-2">
                {ticketType ? (
                  <>
                    {ticketOptions.find(option => option.value === ticketType)?.icon}
                    {ticketOptions.find(option => option.value === ticketType)?.label}
                  </>
                ) : (
                  "Ticket type"
                )}
              </div>
              <div className="text-xl">
                {isDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
              </div>
            </div>
            
            {isDropdownOpen && (
              <div className="absolute left-0 right-0 mt-1 bg-white text-black rounded-md shadow-lg z-10 max-h-60 overflow-auto">
                {ticketOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setTicketType(option.value);
                      setTicketCategory(option.id)
                      setIsDropdownOpen(false);
                    }}
                  >
                    {option.icon}
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-white text-black rounded-md px-3 py-[10px] border border-gray-300"
            placeholder="Subject"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-white text-black rounded-md px-3 py-[10px] border border-gray-300 min-h-16"
            placeholder="Message"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium">Attachment</label>
          <div className="relative">
            <input
              type="file"
              onChange={handleAttachmentChange}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            />
            <div className="w-full bg-white text-black rounded-md px-3 py-[10px] border border-gray-300 flex items-center">
              <FaPaperclip className="mr-2" />
              <span className="truncate">
                {attachment ? attachment.name : "Attachment"}
              </span>
            </div>
          </div>
        </div>

        <input
          type="submit" 
          value={'SUBMIT'}
          className="w-full bg-[#4BAF2A] hover:bg-green-600 text-white rounded-md py-[10px] font-bold text-lg flex items-center justify-center"
        />
          
        
      </form>
    </div>
  );
};

export default TicketForm;