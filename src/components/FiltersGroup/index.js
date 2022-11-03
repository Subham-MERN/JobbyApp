import ProfileCard from '../ProfileCard'
import './index.css'

const FiltersGroup = props => {
  const renderSalaryFiltersList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(rating => {
      const {changeSalary} = props
      const onClickRatingItem = event => changeSalary(event.target.value)

      return (
        <li className="rating-item" key={rating.salaryRangeId}>
          <input
            type="radio"
            id={rating.salaryRangeId}
            name={rating.salaryRangeId}
            value={rating.salaryRangeId}
            onClick={onClickRatingItem}
          />
          <label htmlFor={rating.salaryRangeId}>{rating.label}</label>
        </li>
      )
    })
  }

  const renderSalaryFilters = () => (
    <div>
      <h1 className="rating-heading">Salary Range</h1>
      <ul className="ratings-list">{renderSalaryFiltersList()}</ul>
    </div>
  )

  const renderCategoriesList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(category => {
      const {changeCategory} = props

      const onClickCategoryItem = event => changeCategory(event.target.value)
      return (
        <li className="category-item" key={category.employmentTypeId}>
          <input
            type="checkbox"
            id={category.employmentTypeId}
            value={category.employmentTypeId}
            name={category.employmentTypeId}
            onClick={onClickCategoryItem}
          />
          <label htmlFor={category.employmentTypeId}>{category.label}</label>
        </li>
      )
    })
  }

  const renderJobsCategories = () => (
    <>
      <h1 className="category-heading">Type of Employment</h1>
      <ul className="categories-list">{renderCategoriesList()}</ul>
    </>
  )
  const renderProfileCard = () => <ProfileCard />

  return (
    <div className="filters-group-container">
      {renderProfileCard()}
      <hr />
      {renderJobsCategories()}
      <hr />
      {renderSalaryFilters()}
    </div>
  )
}

export default FiltersGroup
