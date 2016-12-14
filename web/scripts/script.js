$(document).ready(
  function() {
    console.log("Doc is ready");
    getSpeedData();
  }
);



function getSpeedData() {
  $http.get({
    url: 'allSpeedData.json',
    method: 'GET',
    transformResponse: function(data) {
      return data.split('\n').map(function(line) {
        return JSON.parse(line);
      });
    }
  }).success(function(response) {
    console.log(response);
  });

}
