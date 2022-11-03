import {GoLocation} from 'react-icons/go'
import {Link} from 'react-router-dom'
import {BsBriefcase} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsData

  return (
    <li className="product-item">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="main-title">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
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
        <hr className="ruler2" />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobCard
