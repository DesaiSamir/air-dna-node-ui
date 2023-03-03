export type platformsType = {
    airbnb_property_id: number,
    homeaway_property_id: number,
}

type regionsType = {
    neighborhood_ids?: number[],
    zipcode_ids?: number[], 
}

export type propertiesType = {
    img_cover: string
    id: string
    rating: number
    adr: number
    title: string
    platforms: platformsType
    bathrooms: number
    bedrooms: number
    accommodates: number
    latitude: number
    longitude: number
    reviews: number
    real_estate_type: string
    property_type: string
    room_type: string
    ratings: number
    regions: regionsType
    professionally_managed: boolean
    days_available: number
    revenue: number
    occ: string
    map_url: string
}

export type propertyListType = propertiesType[]
    