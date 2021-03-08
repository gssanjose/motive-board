function Form(props) {
   return (
      <form action="" onSubmit={props.submit} >
         <label htmlFor="message"></label>
         <input id="message" type="textarea" onChange={props.change} value={props.value}/>

         <button>Post</button>
      </form>
   )
}

export default Form;