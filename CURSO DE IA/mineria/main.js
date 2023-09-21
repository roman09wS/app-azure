let endpoint = "https://mineria.search.windows.net/indexes/indice-cafe/docs?api-version=2023-07-01-Preview&search=*";
let key = "YhBqCzcGtam5rwdlV5Iiqmts3WOi2To6iNZfdMo9aTAzSeCdsULG";

let headers = {
    "api-key":key
}

fetch(endpoint,{
    method:"GET",
    headers:headers
})
.then( res => res.json())
.then( data => {
    console.log(data);
})