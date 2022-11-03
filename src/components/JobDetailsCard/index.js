import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {GoLocation} from 'react-icons/go'
import {BsBriefcase} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import SkillsCard from '../SkillsCard'
import SimilarJobItem from '../SimilarJobItem'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetailsCard extends Component {
  state = {
    jobsData: {},
    similarJobsData: [],
    skillsList: [],
    life: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedSkills = data => ({
    imageUrl: data.image_url,
    name: data.name,
  })

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const rData = fetchedData.job_details
      const updatedData = {
        companyLogoUrl: rData.company_logo_url,
        companyWebsiteUrl: rData.company_website_url,
        employmentType: rData.employment_type,
        id: rData.id,
        jobDescription: rData.job_description,
        location: rData.location,
        packagePerAnnum: rData.package_per_annum,
        rating: rData.rating,
        title: rData.title,
      }

      const updatedSkillsData = rData.skills.map(each =>
        this.getFormattedSkills(each),
      )
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(each =>
        this.getFormattedData(each),
      )

      const lifeInfo = {
        lifeDes: rData.life_at_company.description,
        lifeImageUrl: rData.life_at_company.image_url,
      }

      this.setState({
        jobsData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        skillsList: updatedSkillsData,
        apiStatus: apiStatusConstants.success,
        life: lifeInfo,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={this.getJobData}>
        Retry
      </button>
    </div>
  )

  renderSuccessCardView = () => {
    const {jobsData, skillsList, life, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobsData

    return (
      <div className="product-details-success-view">
        <div className="product-item">
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
          <div className="link-card">
            <h1>Description</h1>
            <div className="external">
              <a className="anchor" href={companyWebsiteUrl}>
                Visit
              </a>

              <FiExternalLink />
            </div>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills</h1>
          <ul className="skill-card">
            {skillsList.map(each => (
              <SkillsCard key={each.name} item={each} />
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div className="description-container">
            <p className="des-text">{life.lifeDes}</p>
            <img
              src={life.lifeImageUrl}
              alt="life at company"
              className="des-pic"
            />
          </div>
        </div>
        <h1 className="similar-text">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobsData.map(each => (
            <SimilarJobItem jobsData={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessCardView()
      case apiStatusConstants.failure:
        return this.renderFailView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />

        {this.renderJobDetails()}
      </>
    )
  }
}

export default JobDetailsCard
