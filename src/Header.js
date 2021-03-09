

function Header(props) {
   return (
      <header>
         <div className="wrapper head">
            <h1>Motivation Board</h1>
            { props.children }
         </div>
      </header>
   )
}

export default Header;