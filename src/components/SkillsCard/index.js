import './index.css'

const SkillsCard = props => {
  const {item} = props
  const {imageUrl, name} = item

  return (
    <li className="skills-list-mods">
      <img src={imageUrl} className="skills-img" alt={name} />
      <p>{name}</p>
    </li>
  )
}

export default SkillsCard
