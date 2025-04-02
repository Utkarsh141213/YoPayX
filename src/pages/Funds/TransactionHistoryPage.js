import React, { useEffect, useState, useRef } from "react";
import TransactionHistory from "../../components/Funds/Sell-Withdraw/TransactionHistory";
import {
  getTransactionHistory,
  getTransactionHistoryWithFilters,
} from "../../services/fundsAPI/sellWithdrawAPI";
import { toast } from "react-toastify";

const TransactionHistoryPage = () => {
  const [transactions, setTransactions] = useState();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [filterData, setFilterData] = useState([
    {
      id: 1,
      type: "Buy YTP",
    },
    {
      id: 2,
      type: "Sell YTP",
    },
    {
      id: 3,
      type: "Staking Reward",
    },
    {
      id: 4,
      type: "Referral Reward",
    },
    {
      id: 5,
      type: "Staking Hike",
    },
    {
      id: 6,
      type: "Staking Referral Reward",
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        let res;
        if (selectedFilters.length) {
          res = await getTransactionHistoryWithFilters({
            trans_type_filter: selectedFilters,
          });
        } else {
          res = await getTransactionHistory();
        }
        if (res && res.data && Array.isArray(res.data)) {
          setTransactions(res.data);
        } else {
          console.warn("API response data is not an array:", res?.data);
          setTransactions();
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
      }
    })();
  }, [selectedFilters]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFilterChange = (filterType) => {
    if (selectedFilters.includes(filterType)) {
      setSelectedFilters((prevFilters) =>
        prevFilters.filter((item) => item !== filterType)
      );
    } else {
      setSelectedFilters((prevFilters) => [...prevFilters, filterType]);
    }
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return (
    <div className="px-8 md:px-[20vw] xl:px-[28vw] space-y-10 pt-10">
      <div className="flex justify-end">
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={toggleDropdown}
            className={`text-xl text-white bg-[#4BAF2A] w-fit max-w-48 pl-7 pr-7 py-2 rounded-xl font-semibold outline-none appearance-none cursor-pointer flex items-center justify-center`}
          >
            Filter
          </div>
          {isDropdownOpen && (
            <div className="absolute top-full right mt-2 bg-white shadow-md rounded-md z-10 w-fit">
              {filterData.map((filter) => (
                <div
                  key={filter.id}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleFilterChange(filter.type)}
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-[#4BAF2A]"
                    checked={selectedFilters.includes(filter.type)}
                    onChange={() => handleFilterChange(filter.type)}
                  />
                  <label className="ml-2 text-gray-700 whitespace-nowrap">
                    {filter.type}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <h1 className="text-4xl">Transaction History</h1>
      {transactions && <TransactionHistory transactions={transactions} />}
    </div>
  );
};

export default TransactionHistoryPage;
