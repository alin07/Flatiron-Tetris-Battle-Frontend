import React, {Component} from 'react'


class GridCell extends Component {
  constructor(props){
    super(props)
    this.colors = ['white', 'dodgerblue', 'tomato', 'yellow', 'orange', 'mediumseagreen', 'slateblue', 'pink', 'garbage']
  }
  render() {
    const color = this.colors[this.props.value]
    const size = this.props.size ? this.props.size : "poop "
    const divClass = this.props.size ?  size + " " + color : size + " grid-item " + color

     // "grid-item " + this.colors[this.props.value] + " " + this.props.isFull ? "hi" : "" }
    return(
      <div className={ divClass }></div>
    )
  }
}

export default GridCell
