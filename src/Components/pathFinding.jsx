import React, { Component } from "react";
import Grid from "./Grid/Grid";

let START_ROW = 4,
  START_COL = 10,
  FINISH_ROW = 15,
  FINISH_COL = 36,
  ROW = 45,
  COL = 20;

class PathFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Grids: [],
    };
  }

  handleClick = (row, col) => {
    // let temp = this.state.Grids.slice();
    // temp[row][col].params.isWall = true;
    // this.setState({ Grids: temp });
  };

  componentDidMount() {
    const r = ROW,
      c = COL;

    var rows = [];

    var col = [];
    for (var i = 0; i < c; i++) {
      rows = [];
      for (var j = 0; j < r; j++) {
        const params = {
          row: i,
          col: j,
          isStart: i === START_ROW && j === START_COL,
          isFinish: i === FINISH_ROW && j === FINISH_COL,
          isWall: false,
          visited: false,
          handleClick: () => this.handleClick(),
        };
        //rows.push(params);
        rows.push(<Grid key={`${i}-${j}`} params={params} />);
      }
      col.push(<tbody style={{ float: "inline-start" }}>{rows}</tbody>);
    }

    this.setState({ Grids: col });
  }

  render() {
    return (
      <div style={{ marginLeft: 20, marginTop: 20 }}>
        <tbody>{this.state.Grids}</tbody>
      </div>
    );
  }
}

export default PathFinder;
