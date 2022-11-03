import {GoLocation} from 'react-icons/go'
import {BsBriefcase} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {jobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsData

  return (
    <li className="product-item2">
      <div className="main-title2">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo2"
        />
        <div className="card1">
          <h1 className="title">{title}</h1>
          <div className="card-3">
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
            <p className="title">{rating}</p>
          </div>
        </div>
      </div>
      <div className="card-2">
        <div className="card-31">
          <div className="card-3">
            <GoLocation className="icon-mod" />
            <p className="title">{location}</p>
          </div>
          <div className="card-3">
            <BsBriefcase className="icon-mod" />
            <p className="title">{employmentType}</p>
          </div>
        </div>
        <div>
          <p className="title">{packagePerAnnum}</p>
        </div>
      </div>
      <h1>Description</h1>
      <p>{jobDescription}</p>
    </li>
  )
}
export default SimilarJobItem
