function Form(props) {
   return (
      <form action="" onSubmit={props.submit} >
         <label htmlFor="message" className="sr-only">Your message</label>
         <textarea id="message" type="textarea" onChange={props.changeMessage} value={props.inputsValue.inputMessage} placeholder="your message" name="inputMessage" required/>

         <label htmlFor="initial" className="sr-only">Initial</label>
         <input type="text" id="initial" onChange={props.changeMessage} value={props.inputsValue.inputInitial} placeholder="initials (optional)" name="inputInitial"/>

         <button>Post</button>
      </form>
   )
}

export default Form;