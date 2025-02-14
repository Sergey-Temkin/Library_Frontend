import "./AboutUs.css"
import "./Book.jpg"

const AboutUS = () => {
  return (
    <div>
      <div className="aboutUS">
        <div className="photo" style={{ width: "60%" }}>
          <img
            src={"./Book.jpg"}
            style={{
              height: "100%",
              width: "90%",
              margin: "0px 0px",
              borderRadius: "25px 60px",
            }}
            alt="images"
          />
        </div>
        <div className="aboutShop" style={{ width: "40%" }}>
          <h2 className="title2">ABOUT US</h2>
          <div
            className="paragraph"
            style={{ textAlign: "left", margin: "20px 0" }}
          >
            <p>Dear Readers,</p>
            <p>
              My Book Store is an online bookstore website. In this bookstore
              customer will be able to loan books online. We offer tremendous
              gathering of books in various categories of Fantasy, Non-fiction,
              Sci-Fi, Mystery, Action, Romance. We likewise move in immense
              accumulation of Investments and Management, Computers,
              Engineering, Medical, College and School content references books
              proposed by various foundations as schedule the nation over.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AboutUS
