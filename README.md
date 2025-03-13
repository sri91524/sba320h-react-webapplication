# React + Vite

# RTT-60-2024 Class Repo

## Description
React Web Application Project

### Technologies
Vite, React, Javascript, tailwindcss

#### A link to live site -- https://sri-react-bookquest.netlify.app/

#### Components and API
--- Google Book Api used
--- env file used to store API_Key and added in gitignore to avoid tracking in github
--- React components like SearchForm, BookList, and Pagination are developed and used inside App.jsx
--- React hooks like useState, useRef, useEffect are used

##### Functionality
---- User can search books using googlebooks api based on Keyword, Author or Title
---- Book covers along with Title/Author will be displayed
---- On clicking the Book cover, user will be redirected to preview of that google book
---- 10 Book details are displayed per page and max. 40 books are allowed to fetch from api.
---- if there is no result for the search, "no books found" will be displayed

###### Approach
---- useState is used to store book search result, currentpage & totalpages to retain across page rendering
---- useEffect is used to render page on change in formdata or paginatione
---- Initially, Artificial Intelligence books are displayed with use of useEffect
---- useRef is used to allow display Artificial Intelligence book only on initial load
---- Fetch is used to access Googlebooks api
