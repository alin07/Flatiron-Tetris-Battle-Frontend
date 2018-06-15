import React, { Component } from 'react'
import GridCell from './GridCell'

class GridRow extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    
  }

  render() {
    const cells = this.props.row.map((c,i) => <GridCell key={i} value={c}/>)
    return(
      <div className={"grid-template-rows " }>
        { cells }
      </div>
    )
  }
}

export default GridRow
