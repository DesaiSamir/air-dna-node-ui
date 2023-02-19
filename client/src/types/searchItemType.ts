type searchCityType = {
    code: string
    id: number
    name: string
}
type searchCountryType = {
    code: string
    name: string
}
type searchStateType = {
    code: string
    name: string
}
export type searchItemType = {
    city: searchCityType
    country: searchCountryType
    state: searchStateType
    name: string
    region: null | string
    type: string
}