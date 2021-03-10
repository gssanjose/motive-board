import { useState, useEffect } from 'react';
import './styles/App.css';
// import firebase into the component
import firebase from './firebase.js';
import Header from './Header.js';
import Form from './Form.js';
import Footer from './Footer.js';
import Swal from 'sweetalert2';

function App() {

  // initialize a state for for the data that holds the message posts
    // pass in an initial value of an empty array
  const [boardArray, setBoardArray] = useState([]);

  // initialize a state for the inputs (textarea, textInput, #likes)
  const [inputs, setInputs] = useState({
    inputMessage: '',
    inputInitial: '',
    likes: 0
  });


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
          messagePost: postData[postKey].inputMessage,
          messageInitial: postData[postKey].inputInitial,
          likeCount: postData[postKey].likes
        });
      }
      // user the setBoardArray updater function to update state with the value of the array of posts
      setBoardArray(board);
    });
    // second argument of an empty array to ensure the hook runs only once after component renders
  }, [])


  const handleChange = (event) => {
    // state change when a value is put into the input
    setInputs({
      ...inputs, 
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    //prevent default behaviour
    event.preventDefault();
    // create a reference to the database
    const dbRef = firebase.database().ref();
    // if inputMessage contains a message (truthy) push the following to the database
    if (inputs.inputMessage) {
      dbRef.push(inputs);
      // reset the value of the inputs to be '' and 0 (initial values) using the setInputs updater function
      setInputs({
        inputMessage: '',
        inputInitial: '',
        likes: 0
      });
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
          // if the result is confirmed -- remove post from database
          dbRef.child(postUniqueId).remove()
        )
      }
    })
  }

  const likePost = (messageKey) => {
    // create a copy of the boardArray
    const boardArrayCopy = [...boardArray];
    // select the message that has the same uniqueKey as the the post we want to change state
    // inside the object, select the property of 'likeCount' with [0]
    const currentMessage = boardArrayCopy.filter((messageObject) => {
      return messageObject.uniqueKey === messageKey;
    })[0];
    // create a changeable variable that takes the copy of the number of likes, and increases it by 1
    let updatedLikes = currentMessage.likeCount + 1;

    const dbRef = firebase.database().ref();
    // set the value of 'likes' to be what we set the updatedLikes variable to be
    dbRef.child(messageKey).update({
      likes: updatedLikes
    });
  }


  return (
    <div className="App">
      <Header>
        <Form 
          submit={handleSubmit}
          changeMessage={handleChange}
          inputsValue={inputs}
        />
      </Header>
      {/* map through the boardArray in state and display them to the page */}
      <section className='message-board wrapper'>
        {
          boardArray.map((post) => {
            return (
              <div className='message-posts' key={post.uniqueKey} >
                <h2>{post.messagePost}</h2>
                <p className='initial'>{post.messageInitial}</p>
                <button className='likeButton' onClick={() => { likePost(post.uniqueKey)}} >💓</button>
                <p className='likes'>{post.likeCount}</p>
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
