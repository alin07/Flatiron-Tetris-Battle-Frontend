import React, { Component } from 'react'
import GridCell from './GridCell'

class GridRow extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
<<<<<<< HEAD

  }

  render() {
    const cells = this.props.row.map((c,i) => <GridCell key={i} value={c}/>)
=======
  }

  isFull = () => {
    return this.props.row.every(r => r > 0)
  }

  render() {
    const cells = this.props.row.map((c,i) => <GridCell key={i} value={c} isFull={this.isFull} />)
>>>>>>> newRow
    return(
      <div className={"grid-template-rows " }>
        { cells }
      </div>
    )
  }
}

export default GridRow
