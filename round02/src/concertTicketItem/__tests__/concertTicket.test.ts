import {
    getShopWithItem,
    QUALITY_INCREASE_DOUBLE,
    QUALITY_INCREASE_REGULAR,
    QUALITY_POSITIVE,
    QUALITY_ZERO,
    SELL_IN_EXPIRING
} from "../../testSharedConstants/shared";

export const ITEM_NAME_CONCERT_TICKET = "Backstage passes to a TAFKAL80ETC concert";
export const SELL_IN_ABOVE_TEN = 11;
export const SELL_IN_TEN_TO_SIX = 10;
export const SELL_IN_FIVE_TO_ONE = 5;
export const QUALITY_INCREASE_TRIPLE = 8;

describe("Concert Ticket", () => {
        it("quality increases by 1 as its sell-in value approaches but is still more than 10 days", () => {
            const gildedRose = getShopWithItem(ITEM_NAME_CONCERT_TICKET, SELL_IN_ABOVE_TEN, QUALITY_POSITIVE);

            gildedRose.updateQuality();
            const concertTicket = gildedRose.items[0];

            expect(concertTicket.quality).toEqual(QUALITY_INCREASE_REGULAR);
        });

        it("quality increases by 2 as its sell-in value approaches, and is 10 to 6 days", () => {
            const gildedRose = getShopWithItem(ITEM_NAME_CONCERT_TICKET, SELL_IN_TEN_TO_SIX, QUALITY_POSITIVE);

            gildedRose.updateQuality();
            const concertTicket = gildedRose.items[0];

            expect(concertTicket.quality).toEqual(QUALITY_INCREASE_DOUBLE);
        });

        it("quality increases by 3 as its sell-in value approaches and is 5 to 1 days", () => {
            const gildedRose = getShopWithItem(ITEM_NAME_CONCERT_TICKET, SELL_IN_FIVE_TO_ONE, QUALITY_POSITIVE);

            gildedRose.updateQuality();
            const concertTicket = gildedRose.items[0];

            expect(concertTicket.quality).toEqual(QUALITY_INCREASE_TRIPLE);
        });
        it("quality drops 0 after the concert", () => {
            const gildedRose = getShopWithItem(ITEM_NAME_CONCERT_TICKET, SELL_IN_EXPIRING, QUALITY_POSITIVE);

            gildedRose.updateQuality();
            const concertTicket = gildedRose.items[0];

            expect(concertTicket.quality).toEqual(QUALITY_ZERO);
        });
    }
)