import {Action_Load} from "../../Action/Load";
import {Role_Role} from "../../Role/Role";
import {StateMachine_State} from "../State";

export class StateMachine_Builder_Load extends StateMachine_State {
    private name = "Load";

    public execute(role: Role_Role) {
        if (role.creep.carry.energy === role.creep.carryCapacity) {
            role.stateMachine.changeState("Repair");
            return;
        }

        let targets = role.creep.room.findNearestFilledStorage(role.creep);
        if (targets.length === 0) {
            if (this.findStorages(role.creep.room).length === 0) {
                role.stateMachine.changeState("Harvest");
                return;
            }
            role.stateMachine.changeState("Wait");
            return;
        }

        new Action_Load(role.creep).execute(targets[0]);
    }

    private findStorages(room: Room): StructureContainer[]|StructureStorage[] {
        return room.find(FIND_STRUCTURES, {
            filter: (structure: Structure) => structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE,
        }) as StructureContainer[]|StructureStorage[];
    }
}