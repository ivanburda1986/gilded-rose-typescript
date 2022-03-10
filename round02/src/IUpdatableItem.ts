import { Item } from "./item";

export interface IUpdatableItem extends Item{
    update: ()=>void;
    isSimilar: (item:Item)=> boolean;
    create: (item:Item)=> IUpdatableItem;
}