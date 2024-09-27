const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      {props.assignments.map((assignment, index) => (
        <p key={index}>{assignment.part} {assignment.exercises}</p>
      ))}
    </>
  )
}

const Total = (props) => {
  let total = 0;
  props.assignments.forEach(assignment => total += assignment.exercises); 
  return (
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const assignments = [
    {part: 'Fundamentals of React', exercises: 10},
    {part: 'Using props to pass data', exercises: 7},
    {part: 'State of a component', exercises: 14}
  ]

  return (
    <div>
      <Header course={course} />
      <Content assignments={assignments} />
      <Total assignments={assignments} />
    </div>
  )
}

export default App