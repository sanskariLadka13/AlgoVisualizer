export default dijkstra = (startNode, finalNode, grid) => {
  let dRow = [-1, 0, 1, 0],
    dCol = [0, 1, 0, -1];

  let final_x = finalNode.row,
    final_y = finalNode.col;

  let row = grid.length,
    col = grid[0].length;

  let q = new Queue();

  startNode.visited = true;
  q.enqueue(startNode);

  while (!q.isEmpty()) {
    let getQueueElement = q.dequeue();

    console.log(getQueueElement);

    for (let i = 0; i < 4; ++i) {
      let X = getQueueElement.row + dRow[i],
        Y = getQueueElement.col + dCol[i];

      let temp = grid[X][Y];

      if (X >= 0 && Y >= 0 && X < row && Y < col && !temp.visited) {
        if (X === final_x && Y === final_y) {
          console.log("Found Hurrahhhh");
          return;
        }
        temp.visited = true;
        q.enqueue(temp);
      }
    }
  }

  console.log("Not fount Alas!!!");
};
