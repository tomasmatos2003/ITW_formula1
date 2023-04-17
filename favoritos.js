// ViewModel KnockOut
var favoritos = JSON.parse(localStorage.getItem("fav"));
console.log(Array.isArray(favoritos));

var favoritos2 = JSON.parse(localStorage.getItem("fav2"));
console.log(Array.isArray(favoritos2));
var vm = function () {
    console.log("ViewModel initiated...");
    //---VariÃ¡veis locais
    var self = this;
    self.baseUri = ko.observable("http://192.168.160.58/Formula1/api/Drivers/Driver?id=");
    self.baseUri2 = ko.observable("http://192.168.160.58/Formula1/api/Constructors/Constructor?id=");
    self.records = ko.observableArray([]);
    self.records2 = ko.observableArray([]);
    self.favourites = ko.observableArray();
    self.favourites(favoritos);
    self.favourites2 = ko.observableArray();
    self.favourites2(favoritos2);
    self.Nationality = ko.observable('');
    self.Races = ko.observableArray('');



    //--- Page Events
    self.activate = function (id) {
        console.log("CALL: getFavourites...");
        for (let driverID = 0; driverID < favoritos.length; driverID++) {
            var composedUri = self.baseUri() + favoritos[driverID];
            ajaxHelper(composedUri, "GET").done(function (data) {
                self.records.push(data);
                self.Nationality(data.Nationality);
                self.Races(data.Races);

            });
        }
    };
    self.activate2 = function (id) {
        console.log("CALL: getFavourites...");
        for (let driverID = 0; driverID < favoritos2.length; driverID++) {
            var composedUri2 = self.baseUri2() + favoritos2[driverID];
            ajaxHelper(composedUri2, "GET").done(function (data) {
                self.records2.push(data);
                self.Nationality(data.Nationality);
                self.Races(data.Races);

            });
        }
    };

    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        return $.ajax({
            type: method,
            dataType: "json",
            async: false,
            contentType: "application/json",
            url: uri,
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
            },
        });
    }
    self.activate(1);
    self.activate2(1);

};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});