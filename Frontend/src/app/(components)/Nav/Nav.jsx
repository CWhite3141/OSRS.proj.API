import React from 'react'
import Search from './Search'
import Bookmarks from './Bookmarks'

const Nav = () => {
  return (
    <div //prettier-ignore
			className="bg-DarkSlateGray w-full relative"
			style={{ height: "100px", borderBottom: "1px solid black", boxShadow: "0px 1px 5px black" }}>
      <Search />
      <Bookmarks />

    </div>
  )
}

export default Nav
