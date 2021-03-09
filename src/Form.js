function Form(props) {
   return (
      <form action="" onSubmit={props.submit} >
         <label htmlFor="message" className="sr-only">Your message</label>
         <textarea id="message" type="textarea" onChange={props.changeMessage} value={props.valueMessage} placeholder="your message"/>

         {/* <label htmlFor="initial" className="sr-only">Initial</label>
         <input type="text" id="initial" onChange={props.changeText} value={props.valueText}/> */}

         <button>Post</button>
      </form>
   )
}

export default Form;