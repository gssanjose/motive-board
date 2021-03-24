function Header(props) {
   return (
      <header>
         <div className="wrapper head">
            <h1>Motivation Board</h1>
            <h2>If you have any advice, something inspirational, or a quote for your peers, leave it down below!</h2>
            { props.children }
         </div>
      </header>
   )
}

export default Header;