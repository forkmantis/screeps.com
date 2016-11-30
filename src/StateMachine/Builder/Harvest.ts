import { Action_Harvest } from "../../Action/Harvest";
import { Role_Role } from "../../Role/Role";
import { StateMachine_State } from "../State";

export class StateMachine_Builder_Harvest extends StateMachine_State {
    private name = "Harvest";
    public execute(role: Role_Role) {
        let sources = role.creep.room.findSourcesByPriority(role.creep);
        new Action_Harvest(role.creep).execute(sources[0]);

        if (role.creep.carry.energy === role.creep.carryCapacity) {
            role.stateMachine.changeState("Repair");
        }
    }
}