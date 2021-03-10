

function Header(props) {
   return (
      <header>
         <div className="wrapper head">
            <h1>Motivation Board</h1>
            <p>If you have any tips or advice for your peers, leave them down below!</p>
            { props.children }
         </div>
      </header>
   )
}

export default Header;