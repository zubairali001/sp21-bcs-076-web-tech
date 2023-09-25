function fetchData()
{
    console.log('Fetching Data');
    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes",
        success: responseArrived,
    });
    console.log("Request Sent...");
}

$(function (){
    $("#fetchData").on("click", fetchData);
});

function responseArrived(response){
    console.log("Response Arrived");
    console.log(response);

    $("#api_results").empty();
    
    for(let i = 0; i < response.length; i++){
        let rec = response[i];
        
        $("#api_results").append(`<h1>${rec.title}</h1>`);
    }
}