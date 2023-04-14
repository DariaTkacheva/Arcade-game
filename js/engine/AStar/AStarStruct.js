class AStarStruct {
    constructor(point, parent) {
      this.point = point;
      this.parent = parent;
      this.f = 0;
      this.g = 0;
      this.h = 0;
    }
}