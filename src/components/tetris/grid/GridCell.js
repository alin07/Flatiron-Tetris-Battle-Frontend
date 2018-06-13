import React, {Component} from 'react'


class GridCell extends Component {
  constructor(props){
    super(props)
    this.colors = ['white', 'dodgerblue', 'tomato', 'yellow', 'orange', 'mediumseagreen', 'slateblue', 'pink']
  }
  render() {

    return(
      <div className={"grid-item " + this.colors[this.props.value]}></div>
    )
  }
}

export default GridCell
