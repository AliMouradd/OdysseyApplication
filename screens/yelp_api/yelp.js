import axios from "axios";

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer F5nZvpPD7Uvd5YlU73YIi4UcZ9_uJlHYr9pc-nExsO-ad92gJ3VX2Gy0iXNEQ1ymGGsNQ6UKmUJtsJO5-Gm9UQbvqj-dFNI1CIqHiMJKYykkiRmGKXN5QwHzM4JDYnYx'
    }
})