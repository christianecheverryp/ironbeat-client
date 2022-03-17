import React from 'react'

function Searchbar() {
  return (
    <div>

        <form>
            <label htmlFor="header-search">
                    {/* <span className="visually-hidden">Search blog posts</span> */}
                </label>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Search your artist"
                    name="search" 
                />
                <button type="submit">Search</button>
          </form>

    </div>
  )
}

export default Searchbar