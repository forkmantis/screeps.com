import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_SUCCESS, TREE_FAILURE} from "../Constants";

export class Check_CreepCarriesNothing extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        let creep = tick.target as Creep;

        if (creep.carryAmount() === 0) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }
}
