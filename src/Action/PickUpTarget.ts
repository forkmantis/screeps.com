import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_SUCCESS} from "../Constants";

export class Action_PickUpTarget extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        let creep = tick.target as Creep;
        let target = tick.blackboard.get("target", tick.tree.id) as Resource;

        if (target === undefined) {
            return TREE_FAILURE;
        }

        if (creep.pickup(target) === OK) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }
}
