import { Action_TransferEnergy } from "../../Action/TransferEnergy";
import { Role_Role } from "../../Role/Role";
import { StateMachine_State } from "../State";

export class StateMachine_Harvester_TransferEnergy extends StateMachine_State {
    private name = "TransferEnergy";
    public execute(role: Role_Role) {
        if (role.creep.carry.energy === 0) {
            role.stateMachine.changeState("Harvest");
            return;
        }

        let targets = role.creep.room.findSpawnsInNeedOfEnergy(role.creep);

        if (targets.length === 0) {
            role.stateMachine.changeState("Harvest");
        }

        new Action_TransferEnergy(role.creep).execute(targets[0]);
    }
}