

function Header(props) {
   return (
      <header>
         <h1>Motivation Board</h1>
         { props.children }
      </header>
   )
}

export default Header;