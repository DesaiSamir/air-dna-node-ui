module.exports = {
    toLocaleString: function(value) {
        value = parseFloat(value).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
        return value;
    },
    getAirBnbListUrl: function(listingId) {
        return listingId ? `https://www.airbnb.com/rooms/${listingId}` : `https://www.airbnb.com/`
    },
    getAirBnbReviewsUrl: function(listingId) {
        return listingId ? `https://www.airbnb.com/rooms/${listingId}/reviews` : `https://www.airbnb.com/`
    },
    getVerboListUrl: function(listingId) {
        return listingId ? `https://www.vrbo.com/${listingId}` : `https://www.verbo.com/`
    },
    getVerboReviewsUrl: function(listingId) {
        return listingId ? `https://www.vrbo.com/${listingId}#reviews` : `https://www.verbo.com/`
    }
}