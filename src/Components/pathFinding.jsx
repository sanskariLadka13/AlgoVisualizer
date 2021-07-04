import React, { Component } from "react";
import Grid from "./Grid/Grid";
import Queue from "../Algorithms/Queue";

let START_ROW = 8,
  START_COL = 8,
  FINISH_ROW = 13,
  FINISH_COL = 11,
  ROW = 15,
  COL = 35;

class PathFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Grids: [],
    };
  }

  startVisualizing = () => {
    let visitedNodes = this.dijkstra(
      this.state.Grids[START_ROW][START_COL],
      this.state.Grids[FINISH_ROW][FINISH_COL]
    );
    let shortestPath = this.getNodesInShortestPathOrder();
    //console.log(shortestPath);
    this.startAnimation(visitedNodes, shortestPath);
  };

  getNodesInShortestPathOrder = () => {
    let nodesInShortestPathOrder = [];
    let currentNode = this.state.Grids[FINISH_ROW][FINISH_COL];
    while (currentNode.previous.length !== 0) {
      nodesInShortestPathOrder.push(currentNode.previous);
      currentNode =
        this.state.Grids[currentNode.previous[0]][currentNode.previous[1]];
    }
    return nodesInShortestPathOrder;
  };

  showPath = (shortestPath) => {
    let n = shortestPath.length;
    for (let i = n - 1; i >= 0; --i) {
      setTimeout(() => {
        let r = shortestPath[i][0],
          c = shortestPath[i][1];
        let tempNode = this.state.Grids.slice();
        tempNode[r][c].isPath = true;
        this.setState({ Grids: tempNode });
      }, 10 * (n - i));
    }
  };

  startAnimation = (visitedNodes, shortestPath) => {
    for (let i = 0; i <= visitedNodes.length; ++i) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          this.showPath(shortestPath);
        }, 10 * i);
      } else {
        setTimeout(() => {
          let r = visitedNodes[i].row,
            c = visitedNodes[i].col;
          let tempNode = this.state.Grids.slice();
          tempNode[r][c].isColored = true;
          this.setState({ Grids: tempNode });
        }, 10 * i);
      }
    }
  };

  dijkstra = (startNode, finalNode) => {
    let visitedNodesInOrder = [];

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

      visitedNodesInOrder.push(getQueueElement);

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
          let temp = this.state.Grids.slice();
          temp[X][Y].visited = true;
          temp[X][Y].previous = [getQueueElement.row, getQueueElement.col];
          this.setState({ Grids: temp });

          if (X === final_x && Y === final_y) {
            console.log("Found Hurrahhhh");
            return visitedNodesInOrder;
          }

          q.enqueue(gd[X][Y]);
        }
        //
      }
    }

    console.log("Not fount Alas!!!");
    return visitedNodesInOrder;
  };

  handleClick = (row, col) => {
    //console.log(this.state.Grids[row][col].previous);
    //alert(fakekey);
    let temp = this.state.Grids.slice();
    temp[row][col].isWall = true;
    this.setState({ Grids: temp });
  };

  buildGrid = () => {
    this.setState({ Grids: [] });
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
          visited: i === START_ROW && j === START_COL,
          isColored: false,
          previous: [],
          isPath: false,
          handleClick: () => this.handleClick(),
        };
        rows.push(params);
      }
      col.push(rows);
    }

    this.setState({ Grids: col });
  };

  componentDidMount() {
    this.buildGrid();
  }

  render() {
    const { Grids } = this.state;
    return (
      <>
        <button
          style={{ marginLeft: 500 }}
          onClick={() => this.startVisualizing()}
        >
          Start Visualising
        </button>
        <button onClick={() => this.buildGrid()}>Clean Up</button>

        <table style={{ marginLeft: 10, marginTop: 10 }}>
          {Grids.map((row, row_idx) => {
            return (
              <tbody key={`tb-${row_idx}`}>
                <tr style={{}} key={row_idx}>
                  {row.map((node, node_idx) => {
                    const {
                      row,
                      col,
                      isFinish,
                      isStart,
                      isWall,
                      visited,
                      isColored,
                      previous,
                      isPath,
                    } = node;
                    return (
                      <td key={`td-${row_idx}${node_idx}`}>
                        <Grid
                          key={`${row}${col}`}
                          isColored={isColored}
                          row={row}
                          col={col}
                          isFinish={isFinish}
                          isStart={isStart}
                          isWall={isWall}
                          visited={visited}
                          previous={previous}
                          isPath={isPath}
                          handleClick={(row, col) => this.handleClick(row, col)}
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
