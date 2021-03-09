import { useState, useEffect } from 'react';
import './styles/App.css';
// importing firebase into the component
import firebase from './firebase.js';
import Header from './Header.js';
import Form from './Form.js';
import Footer from './Footer.js';
import Swal from 'sweetalert2';

function App() {

  // initialize a state for for the data that holds the message posts
    // pass in an initial value of an empty array
  const [boardArray, setBoardArray] = useState([]);
  // initialize a state for the text area
  const [textareaInput, setTextareaInput] = useState('');
  const [textInput, setTextInput] = useState('');


  useEffect(() => {
    // reference the database and save it to a variable
    const dbRef = firebase.database().ref();
    // start firebase event listener --> accepts a callback function where we define what should occur as the database updates
    dbRef.on('value', (data) => {
      // save the database object within a variable
      const postData = data.val();

      const board = [];

      // use a for-in loop to traverse this object and push the book titles (the property values within the object) into the empty array we created above
      for (let postKey in postData) {
        board.push({
          uniqueKey: postKey,
          messagePost: postData[postKey]
        });
      }
      // user the setBoardArray updater function to update state with the value of the array of posts
      setBoardArray(board);
    });
    // second argument of an empty array to ensure the hook runs only once after component renders
  }, [])


  const handleChange = (event) => {
    // state change when any value is put into the input
    setTextareaInput(event.target.value);
  }

  // const handleChangeText = (event) => {
  //   setTextInput(event.target.value);
  // } 

  const handleSubmit = (event) => {
    //prevent default behaviour
    event.preventDefault();
    // create a reference to the database
    const dbRef = firebase.database().ref();
    // push the value of the textareaInput state variable to the database
    if (textareaInput) {
      dbRef.push(textareaInput);
      // reset the value of the textarea to be '' using the setTextareaInput updater function
      setTextareaInput('');
    }
  }

  // handleClick event handler -- needs a parameter representing the posts uniqueKey that will be used to remove a specific post from the database
  const handleClick = (postUniqueId) => {
    const dbRef = firebase.database().ref();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success',
          dbRef.child(postUniqueId).remove()
        )
      }
    })
  }


  return (
    <div className="App">
      <Header>
        <Form 
          submit={handleSubmit}
          changeMessage={handleChange}
          valueMessage={textareaInput}
          // changeText={handleChangeText}
          // valueText={textInput}
        />
      </Header>
      {/* map through the boardArray in state and display them to the page */}
      <section className='message-board wrapper'>
        {
          boardArray.map((post) => {
            return (
              <div className='message-posts' key={post.uniqueKey} >
                <h2>{post.messagePost}</h2>
                <button onClick={() => {handleClick(post.uniqueKey)}} >Remove</button>
              </div>
            )
          })
        }
      </section>
      <Footer />
    </div>
  );
}

export default App;
