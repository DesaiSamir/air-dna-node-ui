import { platformsType } from "../types/propertyListType";

export const toLocaleString = (value: number):string => {
    return (parseFloat(value.toString()).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }));
}

export const getListingUrl = (platform: platformsType): string => {
    return (
        platform.airbnb_property_id 
        ? getAirBnbListUrl(platform.airbnb_property_id) 
        : getVerboListUrl(platform.homeaway_property_id)
    );
}

export const getAirBnbListUrl = (listingId: number | undefined): string => {
    return listingId ? `https://www.airbnb.com/rooms/${listingId}` : '#';
}

export const getAirBnbReviewsUrl = (listingId: string | undefined): string => {
    return listingId ? `https://www.airbnb.com/rooms/${listingId}/reviews` : '#';
}

export const getVerboListUrl = (listingId: number | undefined): string => {
    return listingId ? `https://www.vrbo.com/${listingId}` : '#';
}

export const getVerboReviewsUrl = (listingId: string | undefined): string => {
    return listingId ? `https://www.vrbo.com/${listingId}#reviews` : '#';
}