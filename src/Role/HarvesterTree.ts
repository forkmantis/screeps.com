import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Check_CreepIsAtCarryLimit} from "../Check/CreepIsAtCarryLimit";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Action_AssignHighestPrioritySourceAsTarget} from "../Action/AssignHighestPrioritySourceAsTarget";
import {Action_HarvestTarget} from "../Action/HarvestTarget";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Check_RoomHasCreepsOfRole} from "../Check/RoomHasCreepsOfRole";
import {Check_TargetSourceHasAttachedContainer} from "../Check/TargetSourceHasAttachedContainer";
import {Action_AssignAttachedContainerOfSourceAsTarget} from "../Action/AssignAttachedContainerOfSourceAsTarget";
import {Action_TransferToTarget} from "../Action/TransferToTarget";
import {Check_HasConstructionSiteNearTarget} from "../Check/HasContstructionSiteNearTarget";
import {Action_CreateConstructionSiteNearTarget} from "../Action/CreateContstructionSiteNearTarget";
import {Action_AssignNearestConstructionSiteAsTarget} from "../Action/AssignNearestConstructionSiteAsTarget";
import {Action_BuildTarget} from "../Action/BuildTarget";
import {Check_AllSpawnsFilled} from "../Check/AllSpawnsFilled";
import {Action_AssignNearestSpawnInNeedOfEnergyAsTarget} from "../Action/AssignNearestSpawnInNeedOfEnergyAsTarget";
import {Tree_Composite_MemoryPriority} from "../Tree/Composite/MemoryPriority";
import {Tree_Tree} from "../Tree/Tree";
import {Check_IsInTargetRoom} from "../Check/IsInTargetRoom";
import {Action_MoveToTargetRoom} from "../Action/MoveToTargetRoom";
import {Check_IsInHomeRoom} from "../Check/IsInHomeRoom";
import {ROLE_SPAWN_SUPPLIER} from "../Constants";

export = new Tree_Tree(
    "Harvester",
    new Tree_Composite_Sequence([
        new Tree_Composite_Priority([
            new Check_IsInTargetRoom(),
            new Action_MoveToTargetRoom(),
        ]),
        new Tree_Composite_MemoryPriority([
            new Tree_Composite_Sequence([
                new Tree_Decorator_Inverter(
                    new Check_CreepIsAtCarryLimit(),
                ),
                new Action_AssignHighestPrioritySourceAsTarget(),
                new Tree_Composite_Priority([
                    new Action_HarvestTarget(),
                    new Action_MoveToTarget(),
                ]),
            ]),
            new Tree_Composite_Sequence([
                new Tree_Composite_Priority([
                    new Check_RoomHasCreepsOfRole(ROLE_SPAWN_SUPPLIER, 1),
                    new Tree_Decorator_Inverter(
                        new Check_IsInHomeRoom(),
                    ),
                ]),
                new Tree_Composite_Priority([
                    new Tree_Composite_Sequence([
                        new Action_AssignHighestPrioritySourceAsTarget(),
                        new Check_TargetSourceHasAttachedContainer(),
                        new Action_AssignAttachedContainerOfSourceAsTarget(),
                        new Tree_Composite_Priority([
                            new Action_TransferToTarget(RESOURCE_ENERGY),
                            new Action_MoveToTarget(),
                        ]),
                    ]),
                    new Tree_Composite_Sequence([
                        new Action_AssignHighestPrioritySourceAsTarget(),
                        new Tree_Composite_Priority([
                            new Check_HasConstructionSiteNearTarget(STRUCTURE_CONTAINER, 1),
                            new Action_CreateConstructionSiteNearTarget(STRUCTURE_CONTAINER, 1),
                        ]),
                        new Action_AssignNearestConstructionSiteAsTarget(),
                        new Tree_Composite_Priority([
                            new Action_BuildTarget(),
                            new Action_MoveToTarget(),
                        ]),
                    ]),
                ]),
            ]),
            new Tree_Composite_Sequence([
                new Tree_Decorator_Inverter(
                    new Check_AllSpawnsFilled(),
                ),
                new Action_AssignNearestSpawnInNeedOfEnergyAsTarget(),
                new Tree_Composite_Priority([
                    new Action_TransferToTarget(RESOURCE_ENERGY),
                    new Action_MoveToTarget(),
                ]),
            ]),
        ]),
    ]),
);
