import React from 'react'

function Searchbar() {
  return (
    <div>

        <form action="/" method="get">
                <label htmlFor="header-search">
                    {/* <span className="visually-hidden">Search blog posts</span> */}
                </label>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Search your artist"
                    name="s" 
                />
                <button type="submit">Search</button>
            </form>

    </div>
  )
}

export default Searchbar