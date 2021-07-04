import React, { Component } from "react";
import Grid from "./Grid/Grid";
import Queue from "../Algorithms/Queue";

let START_ROW = 8,
  START_COL = 8,
  FINISH_ROW = 10,
  FINISH_COL = 15,
  ROW = 15,
  COL = 35;

class PathFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Grids: [],
    };
  }

  dijkstra = (startNode, finalNode) => {
    let dRow = [-1, 0, 1, 0],
      dCol = [0, 1, 0, -1];

    let final_x = finalNode.row,
      final_y = finalNode.col;

    let row = this.state.Grids.length,
      col = this.state.Grids[0].length;

    let q = new Queue();

    q.enqueue(startNode);

    while (!q.isEmpty()) {
      let getQueueElement = q.dequeue();

      console.log(getQueueElement.row);

      for (let i = 0; i < 4; ++i) {
        let X = getQueueElement.row + dRow[i],
          Y = getQueueElement.col + dCol[i];

        let gd = this.state.Grids.slice();

        if (
          X >= 0 &&
          Y >= 0 &&
          X < row &&
          Y < col &&
          !gd[X][Y].visited &&
          !gd[X][Y].isWall
        ) {
          if (X === final_x && Y === final_y) {
            console.log("Found Hurrahhhh");
            return;
          }

          //Doing the coloring thing

          let temp = this.state.Grids.slice();
          temp[X][Y].visited = true;
          this.setState({ Grids: temp });

          q.enqueue(gd[X][Y]);
        }
        //
      }
    }

    console.log("Not fount Alas!!!");
  };

  handleClick = (row, col) => {
    //alert(`${row} , ${col}`);
    let temp = this.state.Grids.slice();
    temp[row][col].isWall = true;
    this.setState({ Grids: temp });
  };

  componentDidMount() {
    const r = ROW,
      c = COL;

    let rows = [];

    let col = [];
    for (var i = 0; i < r; i++) {
      rows = [];
      for (var j = 0; j < c; j++) {
        const params = {
          row: i,
          col: j,
          isStart: i === START_ROW && j === START_COL,
          isFinish: i === FINISH_ROW && j === FINISH_COL,
          isWall: false,
          visited: false,
          handleClick: () => this.handleClick(),
        };
        rows.push(params);
      }
      col.push(rows);
    }

    this.setState({ Grids: col });
  }

  render() {
    const { Grids } = this.state;
    return (
      <>
        <button
          style={{ marginLeft: 500 }}
          title="Do BFS"
          onClick={() =>
            this.dijkstra(
              this.state.Grids[START_ROW][START_COL],
              this.state.Grids[FINISH_ROW][FINISH_COL]
            )
          }
        >
          Start Visualising
        </button>
        <table style={{ marginLeft: 10, marginTop: 10 }}>
          {Grids.map((row, row_idx) => {
            return (
              <tbody key={`tb-${row_idx}`}>
                <tr style={{}} key={row_idx}>
                  {row.map((node, node_idx) => {
                    const { row, col, isFinish, isStart, isWall, visited } =
                      node;
                    return (
                      <td key={`td-${row_idx}-${node_idx}`}>
                        <Grid
                          key={`${row_idx}-${node_idx}`}
                          row={row}
                          col={col}
                          isFinish={isFinish}
                          isStart={isStart}
                          isWall={isWall}
                          visited={visited}
                          handleClick={() => this.handleClick(row, col)}
                        ></Grid>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            );
          })}
        </table>
      </>
    );
  }
}

export default PathFinder;
