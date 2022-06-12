const experienceRowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 60%",
  gridTemplateRows: "max-content",
  gap: "0px 1em",
  marginBottom: "3em"
}

export default function ExperienceRow({title, company, description}) {
  return (
    <div style={experienceRowStyle}>
      <div>
        <h2 style={{marginTop: 0, marginBottom: 4}}>{title}</h2>
        <h4>{company}</h4>
      </div>
      <div> 
        <p style={{marginTop: 0}}>{description}</p>
      </div>
    </div>
  )
}