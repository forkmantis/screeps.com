export class WallsAndRamparts implements IWallsAndRamparts {

    private structures: (StructureWall|StructureRampart)[];

    public constructor(structures: (StructureWall|StructureRampart)[] = []) {
        this.structures = structures;
    }

    public withNotMaxHitpoints(): WallsAndRamparts {
        return new WallsAndRamparts(
            _.filter(this.structures, (structure: StructureWall|StructureRampart) => structure.hits < structure.hitsMax)
        );
    }

    public orderByPriority(): WallsAndRamparts {
        let structures = this.structures;
        structures.sort((a: Structure, b: Structure) => Math.floor(a.hits / 500) - Math.floor(b.hits / 500));

        return new WallsAndRamparts(structures);
    }

    public closestByPath(pos: RoomPosition): StructureWall|StructureRampart {
        return pos.findClosestByPath(this.structures);
    }

    public first(): StructureWall|StructureRampart {
        return this.structures[0];
    }
}
