import '../styles/Card1.css'

function Card({ image, title }) {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-img" />
      <div className="card-text">
        <h3>red dead redemption</h3>
      </div>
    </div>
  )
}

export default Card