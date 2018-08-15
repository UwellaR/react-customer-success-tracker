import React, { Component } from 'react';


class Home extends Component {


  render () {
    return (
      <div >
        <h1>Welcome to the Ogugu Customers' Feedback Website!</h1>

        <form className="frontpage" action="/feedback" method="post" encType='multipart/form-data' >
            <legend> Personal Information: </legend> <br />
                 First name: <br />
                <input type="text" name="firstname" /><br />
                 Last name: <br />
                <input type="text" name="lastname" /><br />
                 Address: <br />
                <input type="text" name="address" /><br />
                 Phone number: <br />
                <input type="text" name="phone_number" /><br />

        <br />

          <legend> Comments: </legend>
            <textarea name="message" rows="15" cols="30">
            </textarea>
        <br />
        <br />
          <label htmlFor="screenshot">Choose an Image to upload (JPG, JPEG, PNG)</label><br /><br />
          <input type="file" id="screenshot" name="screenshot" accept=".jpg, .jpeg, .png" />

        <input type="submit" value="Submit" />
      </form>
    </div>

  );

}

}

export default Home
