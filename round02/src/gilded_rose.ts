import { Item } from "./item";
import { isSulfuras } from "./sulfurasItem/sulfuras";
import { isConcertTicket, updateConcertTicket } from "./concertTicketItem/concertTicket";
import { isAgedBrie, updateAgedBrie } from "./agedBrieItem/agedBrie";
import { updateNormal } from "./normalItem/normalItem";

export class Shop {
    items: Item[];

    constructor(items: Item[] = []) {
        this.items = items;
    }


    updateQuality() {
        this.items.forEach(item => {

            if (isSulfuras(item)) {
                return;
            }


            if (isAgedBrie(item)) {
                updateAgedBrie(item);
                return;
            }


            if (isConcertTicket(item)) {
                updateConcertTicket(item);
                return;
            }

            //Normal item
            updateNormal(item);
        });
        return this.items;
    }
}
