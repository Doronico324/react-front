import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BsCart4 } from 'react-icons/bs'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import '../App.css'

function Navbar({ categories, handleCategoryClick, searchproduct }) {
  const [filterdProductname, setFilteredProductname] = useState('')
  const location = useLocation()
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')
  const [userId, setUserId] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token',)
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        setUserId(decodedToken.user_id)
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    }
  }, [token])

  useEffect(() => {
    try {
      if (userId) {
        axios
          .get(`https://django-framework-store.onrender.com/user/${userId}/`)
          .then((response) => {
            const fetchedUsername = response.data.username
            setUsername(fetchedUsername)
          })
          .catch((error) => {
            console.error('Error fetching username:', error)
          })
      }
    } catch (error) {
      console.error('Error in fetching username:', error)
    }
  }, [userId])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUsername('')
    window.location.reload() 
    navigate('/react-store')
  }

  return (
    <>
      <nav className="navbar">
        <ul className="nav">
          <li className="nav">
            <Link to="/react-store" className="nav-link" onClick={() => handleCategoryClick('')}>
              All Products
            </Link>
          </li>
          {categories.map((category, index) => (
            <li key={index} className="nav-item">
              <Link to="/react-store" className="nav-link active" onClick={() => handleCategoryClick(category)}>
                {category}
              </Link>
            </li>
          ))}
          <li className="nav">
            <input
              value={filterdProductname}
              onChange={(e) => setFilteredProductname(e.target.value)}
              className="nav-input"
              style={{ marginRight: '10px' }}
              placeholder="Search Product" 
            />
          </li>
          <li className="nav">
            <Link
              to="/react-store"
              className="btn btn-info"
              onClick={() => searchproduct(filterdProductname)}
              style={{ borderRadius: '5px', padding: '8px 20px', fontSize: '16px', marginRight: '10px' }}
            >
              Search
            </Link>
          </li>
          {/* Display login button if not logged in */}
          {!token && location.pathname !== '/login' && (
            <li className="nav-item" style={{ marginRight: '10px' }}>
              <Link className="btn btn-success" to="/login">
                Login
              </Link>
            </li>
          )}
          {/* Display logout button if logged in */}
          {token && (
            <li className="nav-item" style={{ marginRight: '10px' }}>
              <Link className="btn btn-danger" to="/react-store" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}
          <div>
            {username ? (
              <p className="welcome-message">
                Welcome, <span className="username">{username}</span>!
              </p>
            ) : (
              <p className="welcome-message">Welcome, guest!</p>
            )}
          </div>{' '}
          {token && userId && (
            <React.Fragment>
              <li className="nav-item">
                <Link to={`/cart/${userId}`}>
                  <BsCart4 style={{ fontSize: '2em', color: 'white' }} />
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </>
  )
}
export default Navbar
