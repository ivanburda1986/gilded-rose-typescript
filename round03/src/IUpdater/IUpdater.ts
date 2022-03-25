import {Item} from "../item";

export interface IUpdater {
    isUsable: (item: Item) => boolean;
    update: (item: Item) => void;
}