import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import JobCard from '../JobCard'
import FiltersGroup from '../FiltersGroup'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    activeCategoryId: '',
    searchInput: '',
    activeSalaryRangeId: '',
    updatedCategoryList: ['FULLTIME', 'PARTTIME'],
    updatedSalaryList: [salaryRangesList[0].salaryRangeId],
  }

  componentDidMount() {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, updatedSalaryList, updatedCategoryList} = this.state
    const x = updatedCategoryList.join()
    const y = updatedSalaryList.join()
    console.log(x, y)
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${x}&minimum_package=${y}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))

      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
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

  renderFailureView = () => (
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
      <button type="button" onClick={this.getAllJobs}>
        Retry
      </button>
    </div>
  )

  renderJobsView = () => {
    const {jobsList} = this.state
    const shouldShowProductsList = jobsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <ul className="products-list">
          {jobsList.map(each => (
            <JobCard jobsData={each} key={each.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png  "
          className="no-products-img"
          alt="no jobs"
        />
        <h1 className="no-products-heading">No Jobs Found</h1>
        <p className="no-products-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  updateSalary = () => {
    const {activeSalaryRangeId, updatedSalaryList} = this.state
    this.setState(
      {
        updatedSalaryList: [...updatedSalaryList, activeSalaryRangeId],
      },
      this.getAllJobs,
    )
  }

  updateCategory = () => {
    const {activeCategoryId, updatedCategoryList} = this.state

    this.setState(
      {
        updatedCategoryList: [...updatedCategoryList, activeCategoryId],
      },
      this.getAllJobs,
    )
  }

  changeSalary = activeRatingId => {
    this.setState(
      {activeSalaryRangeId: activeRatingId},

      this.updateSalary,
    )
  }

  changeCategory = catId => {
    this.setState({activeCategoryId: catId}, this.updateCategory)
  }

  enterSearchInput = () => {
    this.getAllJobs()
  }

  changeSearchInput = searchValue => {
    this.setState({searchInput: searchValue})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.enterSearchInput()
    }
  }

  onChangeSearchInput = event => {
    this.changeSearchInput(event.target.value)
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button
          type="button"
          className="srcbtn"
          testid="searchButton"
          onClick={this.getAllJobs}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    const {activeCategoryId, activeSalaryRangeId} = this.state

    return (
      <div className="all-products-section">
        <FiltersGroup
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          activeCategoryId={activeCategoryId}
          activeRatingId={activeSalaryRangeId}
          changeCategory={this.changeCategory}
          changeSalary={this.changeSalary}
        />
        <div className="bottom-card">
          {this.renderSearchInput()}
          {this.renderAllJobs()}
        </div>
      </div>
    )
  }
}

export default AllJobsSection
