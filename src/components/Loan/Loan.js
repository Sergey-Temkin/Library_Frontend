import React from "react";
import axios from "axios";

const LoanBook = ({ bookId, token }) => {
  const handleLoan = async () => {
    try {
      await axios.post(
        `http://localhost:8000/api/library/borrow_book/${bookId}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Book borrowed successfully!");
    } catch (error) {
      alert(error.response?.data?.error || "Error borrowing book.");
    }
  };

  const handleReturn = async () => {
    try {
      await axios.post(
        `http://localhost:8000/api/library/return_book/${bookId}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Book returned successfully!");
    } catch (error) {
      alert(error.response?.data?.error || "Error returning book.");
    }
  };

  return (
    <div>
      <button onClick={handleLoan}>Loan Book</button>
      <button onClick={handleReturn}>Return Book</button>
    </div>
  );
};

export default LoanBook;
