import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_SUCCESS, TREE_RUNNING} from "../Constants";

export class Action_MoveToRoom extends Tree_Core_Action {

    private room: string;

    public constructor(room: string) {
        super();
        this.room = room;
    }

    public tick(tick: Tree_Core_Tick): number {
        let creep = tick.target as Creep;

        if (creep.moveToRoom(this.room) !== OK) {
            return TREE_FAILURE;
        }

        if (creep.isInRoom(this.room)) {
            return TREE_SUCCESS;
        }

        return TREE_RUNNING;
    }
}
