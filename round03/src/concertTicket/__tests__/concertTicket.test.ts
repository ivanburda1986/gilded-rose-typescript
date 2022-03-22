import {
    getShopWithItem,
    QUALITY_INCREASE_REGULAR,
    QUALITY_POSITIVE, QUALITY_MINIMUM,
    SELL_IN_EXPIRED,
    SELL_IN_POSITIVE
} from "../../testSharedConstants";

const CONCERT_TICKET_ITEM = 'Backstage passes to a TAFKAL80ETC concert';
const SELL_IN_ABOVE_TEN = 11;
const SELL_IN_10_TO_6 = 7;
const SELL_IN_5_TO_1 = 3;
const QUALITY_INCREASE_DOUBLE = 7;
const QUALITY_INCREASE_TRIPLE = 8;

describe("Concert ticket", () => {
    it("increases quality by 1", () => {
        const gildedRose = getShopWithItem(CONCERT_TICKET_ITEM, SELL_IN_ABOVE_TEN, QUALITY_POSITIVE);

        gildedRose.updateQuality();

        const concertTicket = gildedRose.items[0];
        expect(concertTicket.quality).toEqual(QUALITY_INCREASE_REGULAR);
    });

    it("increases quality by 2 if its sellIn is from 10 to 6 days", () => {
        const gildedRose = getShopWithItem(CONCERT_TICKET_ITEM, SELL_IN_10_TO_6, QUALITY_POSITIVE);

        gildedRose.updateQuality();

        const concertTicket = gildedRose.items[0];
        expect(concertTicket.quality).toEqual(QUALITY_INCREASE_DOUBLE);
    });

    it("increases quality by 3 if its sellIn is from 5 to 1", () => {
        const gildedRose = getShopWithItem(CONCERT_TICKET_ITEM, SELL_IN_5_TO_1, QUALITY_POSITIVE);

        gildedRose.updateQuality();

        const concertTicket = gildedRose.items[0];
        expect(concertTicket.quality).toEqual(QUALITY_INCREASE_TRIPLE);
    });

    it("quality becomes 0 if its sellIn is 0", () => {
        const gildedRose = getShopWithItem(CONCERT_TICKET_ITEM, SELL_IN_EXPIRED, QUALITY_POSITIVE);

        gildedRose.updateQuality();

        const concertTicket = gildedRose.items[0];
        expect(concertTicket.quality).toEqual(QUALITY_MINIMUM);
    });
});