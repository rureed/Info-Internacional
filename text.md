var api = "9e8c124e933b40728ba4e67ce0248f18"

        var queryURL = `https://ridb.recreation.gov/${api}/v1/activities?query=hiking&limit=5&offset=0`

        $.ajax({
            url : queryURL,
            method: "GET",
        }).then(function(response){
            console.log(response);
        })
