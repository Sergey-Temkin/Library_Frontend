/* src/components/AboutUs/AboutUs.js */
import "./AboutUs.css"

const AboutUS = () => {

  

  return (
    <div className="aboutUS">
      <div className="photo">
        <img src={"./Book.jpg"} alt="Book" />
      </div>
      <div className="aboutShop">
        <h2 className="title2">ABOUT US</h2>
        <div className="paragraph">
          <p>Dear Readers,</p>
          <p>
            My Book Store is an online bookstore website. In this bookstore,
            customers will be able to loan books online. We offer a tremendous
            collection of books in various categories, including Fantasy,
            Non-fiction, Sci-Fi, Mystery, Action, and Romance. We also have a
            vast collection of books on Investments and Management, Computers,
            Engineering, Medical fields, and educational references used in
            colleges and schools across the nation.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutUS
