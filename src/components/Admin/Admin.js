/* src/components/Admin/Admin.js */
import React, { useEffect, useState, useContext, useCallback } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { LoginContext } from "../../LoginContext"

const AdminDashboard = () => {
  const [data, setData] = useState({ users: 0, books: 0, loans: 0 })
  const [books, setBooks] = useState([])
  const [loans, setLoans] = useState([])
  const [newBook, setNewBook] = useState({
    name: "",
    author: "",
    year_published: "",
    category: "Romance",
    inventory: 1,
    image_url: "",
  })

  const { login } = useContext(LoginContext)
  const navigate = useNavigate()
  const token = localStorage.getItem("accessToken")
  const isAdmin = login?.is_admin || false

  const getBooks = async () => {
    try {
      const booksRes = await axios.get(
        "http://127.0.0.1:8000/api/library/books/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setBooks(booksRes.data)
    } catch (err) {
      console.error("Error fetching books", err)
    }
  }

  const fetchAdminData = useCallback(async () => {
    try {
      const [dashboardRes, booksRes, loansRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/api/library/admin-dashboard/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://127.0.0.1:8000/api/library/books/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://127.0.0.1:8000/api/library/loans/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])
      setData(dashboardRes.data)
      setBooks(booksRes.data)
      setLoans(loansRes.data)
    } catch (err) {
      console.error("Error fetching admin data", err)
    }
  }, [token])

  useEffect(() => {
    if (!isAdmin) {
      navigate("/")
    } else {
      fetchAdminData()
    }
  }, [isAdmin, navigate, fetchAdminData])

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value })
  }

  const addBook = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://127.0.0.1:8000/api/library/books/", newBook, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setNewBook({
        name: "",
        author: "",
        year_published: "",
        category: "Romance",
        inventory: 1,
        image_url: "",
      })
      fetchAdminData()
    } catch (err) {
      console.error("Error adding book", err)
    }
  }

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/library/books/${bookId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchAdminData()
    } catch (err) {
      console.error("Error deleting book", err)
    }
  }

  const deleteLoan = async (loanId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/library/loans/${loanId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchAdminData()
    } catch (err) {
      console.error("Error deleting loan", err)
    }
  }

  const markAsReturned = async (loanId) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/library/loans/${loanId}/`,
        { returned: true },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setBooks([]) // Force React to re-render before fetching
      setTimeout(() => {
        fetchAdminData() // Fetch updated book inventory
        getBooks()
      }, 500)
    } catch (err) {
      console.error("Error marking loan as returned", err)
    }
  }

  if (!isAdmin) {
    return <h3 className="text-center mt-5">Access Denied</h3>
  }

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      {/* Statistics */}
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Total Users</h5>
              <p>{data.users}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Total Books</h5>
              <p>{data.books}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Total Loans</h5>
              <p>{data.loans}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Book Form */}
      <h3 className="mt-4">Add New Book</h3>
      <form onSubmit={addBook} className="mb-4">
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="name"
              value={newBook.name}
              onChange={handleInputChange}
              placeholder="Book Name"
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
              placeholder="Author"
              required
            />
          </div>
          <div className="col">
            <input
              type="number"
              className="form-control"
              name="year_published"
              value={newBook.year_published}
              onChange={handleInputChange}
              placeholder="Year Published"
              required
            />
          </div>
          <div className="col">
            <select
              className="form-control"
              name="category"
              value={newBook.category}
              onChange={handleInputChange}
              required
            >
              <option value="Romance">Romance</option>
              <option value="Action">Action</option>
              <option value="Mystery">Mystery</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Non-Fiction">Non-Fiction</option>
            </select>
          </div>
          <div className="col">
            <input
              type="number"
              className="form-control"
              name="inventory"
              value={newBook.inventory}
              onChange={handleInputChange}
              placeholder="Inventory"
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="image_url"
              value={newBook.image_url}
              onChange={handleInputChange}
              placeholder="Image URL"
              required
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              Add Book
            </button>
          </div>
        </div>
      </form>

      {/* Books List */}
      <h3>Books List</h3>
      <ul className="list-group mb-4">
        {books.map((book) => (
          <li
            key={book.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {book.name} by {book.author} ({book.inventory} copies)
            <button
              onClick={() => deleteBook(book.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Loans List */}
      <h3>Loans List</h3>
      <ul className="list-group">
        {loans.map((loan) => (
          <li
            key={loan.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {loan.user_name || "Unknown User"} borrowed "
            {loan.book_name || "Unknown Book"}"
            {!loan.returned ? (
              <>
                <button
                  onClick={() => markAsReturned(loan.id)}
                  className="btn btn-success"
                >
                  Mark as Returned
                </button>
                <button
                  onClick={() => deleteLoan(loan.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </>
            ) : (
              <span className="text-success">Returned</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminDashboard
