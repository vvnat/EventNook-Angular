export type Event = {
    id: number;
    eventType: number,
    creatorId: number;
    startDate: Date;
    endDate: Date;
    spaceId: number | null;
    restaurantId: number | null;
    cateringId: number | null;
    musicianId: number | null;
    open_bar: boolean;
    guestsNumber: number
  }