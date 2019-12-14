export class Transform {
    constructor() {
        this.apply = (geometry) => Object.assign(geometry, {
            position: [...this.position],
            rotation: this.rotation,
        });
        this.position = [0, 0];
        this.rotation = 0;
        this.savedPositions = [];
        this.savedRotations = [];
    }
    save() {
        this.savedPositions.push([this.position[0], this.position[1]]);
        this.savedRotations.push(this.rotation);
    }
    restore() {
        if (this.savedPositions.length) {
            const pos = this.savedPositions.pop();
            const rot = this.savedRotations.pop();
            this.position[0] = pos[0];
            this.position[1] = pos[1];
            this.rotation = rot;
        }
    }
}
