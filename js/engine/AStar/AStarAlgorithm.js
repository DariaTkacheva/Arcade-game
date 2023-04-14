class AStarAlgorithm {
    setMap(map) {
        this.map = map;
    }

    setPoints(start, goal) {
        this.start = start;
        this.goal = goal;
    }

    isWall(i) {
        return i === 1 || i === 2 || i === 3;
    }

    run() {
        var open = [];
        var closed = [];
      
        open.push(new AStarStruct(this.start, null));
      
        while (open.length > 0 && open.length < 1000) {
            var current = open[0];
            var currentIdx = 0;
        
            for (var i = 1; i < open.length; i++) {
                if (open[i].f < current.f) {
                    current = open[i];
                    currentIdx = i;
                }
            }
        
            open.splice(currentIdx, 1);

            closed.push(current);
        
            if (current.point[0] === this.goal[0] && current.point[1] === this.goal[1]) {
                var path = [];
                var currentWaypoint = current;

                while (currentWaypoint !== null) {
                path.push(currentWaypoint.point);
                currentWaypoint = currentWaypoint.parent;
                }
                
                return path.reverse();
            }
        
            var neighbors = [];
            var x = current.point[0];
            var y = current.point[1];
        
            if (x > 0) {
                neighbors.push([x - 1, y]);
            }
            if (x < this.map.length - 1) {
                neighbors.push([x + 1, y]);
            } 
            if (y > 0) {
                neighbors.push([x, y - 1]);
            }
            if (y < this.map[0].length - 1) {
                neighbors.push([x, y + 1]);
            }
            if (x > 0 && y < this.map[0].length - 1) {
                neighbors.push([x - 1, y + 1]);
            }
            if (x < this.map.length - 1 && y < this.map[0].length - 1) {
                neighbors.push([x + 1, y + 1])
            }
            if (x < this.map.length - 1 && y > 0) {
                neighbors.push([x + 1, y - 1])
            }
            if (x > 0 && y > 0) {
                neighbors.push([x - 1, y - 1])
            }
        
            for (i = 0; i < neighbors.length; i++) {
                var neighbor = new AStarStruct(neighbors[i], current);
        
                if (closed.includes(neighbor) || this.isWall(this.map[neighbors[i][0]][neighbors[i][1]])) {
                    continue;
                }
        
                neighbor.g = current.g + this.heuristic(neighbor.point, current.point);
                neighbor.h = this.heuristic(neighbor.point, this.goal);
                neighbor.f = neighbor.g + neighbor.h;
        
                var openNeighbor = open.find(node => node.point[0] === neighbor.point[0] && node.point[1] === neighbor.point[1]);
        
                if (openNeighbor !== undefined && neighbor.g > openNeighbor.g) {
                    continue;
                }
        
                open.push(neighbor);
            }
        }
      
        return null;
    }

    heuristic(a, b) {
        var dx = Math.abs(a[0] - b[0]);
        var dy = Math.abs(a[1] - b[1]);

        return dx + dy;
    }

}