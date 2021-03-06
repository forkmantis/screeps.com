import {Tree_Tree} from "../Tree/Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Action_UpgradeController} from "../Action/UpgradeController";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Check_DroppedEnergyAvailable} from "../Check/DroppedEnergyAvailable";
import {Check_CreepCarriesNothing} from "../Check/CreepCarriesNothing";
import {Action_AssignHighestPriorityDamagedStructureAsTarget} from "../Action/AssignHighestPriorityDamagedStructureAsTarget";
import {Action_AssignHighestPriorityConstructionSiteAsTarget} from "../Action/AssignHighestPriorityConstructionSiteAsTarget";
import {Check_CreepIsAtCarryLimit} from "../Check/CreepIsAtCarryLimit";
import {Action_AssignHighestPrioritySourceAsTarget} from "../Action/AssignHighestPrioritySourceAsTarget";
import {Action_AssignControllerAsTarget} from "../Action/AssignControllerAsTarget";
import {Action_AssignNearestDroppedEnergyAsTarget} from "../Action/AssignNearestDroppedEnergyAsTarget";
import {Action_AssignNearestFilledStorageAsTarget} from "../Action/AssignNearestFilledStorageAsTarget";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Action_HarvestTarget} from "../Action/HarvestTarget";
import {Action_BuildTarget} from "../Action/BuildTarget";
import {Tree_Composite_MemoryPriority} from "../Tree/Composite/MemoryPriority";
import {Check_IsInHomeRoom} from "../Check/IsInHomeRoom";
import {Action_MoveToHomeRoom} from "../Action/MoveToHomeRoom";
import {Action_PickUpTarget} from "../Action/PickUpTarget";
import {Action_WithdrawFromTarget} from "../Action/WithdrawFromTarget";
import {Action_RepairTarget} from "../Action/RepairTarget";

export = new Tree_Tree(
    "Builder",
    new Tree_Composite_Sequence([
        new Tree_Composite_Priority([
            new Check_IsInHomeRoom(),
            new Action_MoveToHomeRoom(),
        ]),
        new Tree_Composite_MemoryPriority([
            new Tree_Composite_Sequence([
                new Tree_Decorator_Inverter(
                    new Check_CreepCarriesNothing(),
                ),
                new Action_AssignHighestPriorityDamagedStructureAsTarget(),
                new Tree_Composite_Priority([
                    new Action_RepairTarget(),
                    new Action_MoveToTarget(),
                ]),
            ]),
            new Tree_Composite_Sequence([
                new Tree_Decorator_Inverter(
                    new Check_CreepCarriesNothing(),
                ),
                new Action_AssignHighestPriorityConstructionSiteAsTarget(),
                new Tree_Composite_Priority([
                    new Action_BuildTarget(),
                    new Action_MoveToTarget(),
                ]),
            ]),
            new Tree_Composite_Sequence([
                new Tree_Decorator_Inverter(
                    new Check_CreepCarriesNothing(),
                ),
                new Action_AssignControllerAsTarget(),
                new Tree_Composite_Priority([
                    new Action_UpgradeController(),
                    new Action_MoveToTarget(),
                ]),
            ]),
            new Tree_Composite_Sequence([
                new Check_DroppedEnergyAvailable(5),
                new Action_AssignNearestDroppedEnergyAsTarget(),
                new Tree_Composite_Priority([
                    new Action_PickUpTarget(),
                    new Action_MoveToTarget(),
                ]),
            ]),
            new Tree_Composite_Sequence([
                new Action_AssignNearestFilledStorageAsTarget(),
                new Tree_Composite_Priority([
                    new Action_WithdrawFromTarget(RESOURCE_ENERGY),
                    new Action_MoveToTarget(),
                ]),
            ]),
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
        ]),
    ]),
);
