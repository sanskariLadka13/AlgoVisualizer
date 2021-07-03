import React, { Component } from "react";
import "./grid.css";

class Grid extends Component {
  state = {};

  //alert(`${row} , ${col}`)
  render() {
    const { row, col, isStart, isFinish, isWall, visited, handleClick } =
      this.props.params;
    const cName = isStart
      ? `type-start`
      : isFinish
      ? `type-finish`
      : isWall
      ? `type-wall`
      : visited
      ? `type-visited`
      : `grid`;

    return (
      <div style={{ float: "left" }}>
        <button className={cName} onClick={() => handleClick(row, col)} />
      </div>
    );
  }
}

export default Grid;
