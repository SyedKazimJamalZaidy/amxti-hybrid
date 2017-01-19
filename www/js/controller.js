var resultData = [];//result of flights coming from Sabre api
var destinationName = []; //destination name coming from solude.amxti server
var destinationIATA = []; //IATA name coming from solude.amxti server
var result; //Response result of Airports from solude amxti
var airlineInfo; //Response result of Airlines
var selectedFlight;
var securityToken; //Security Token received from Sabre
app.controller('MenuController', function($scope, $ionicSideMenuDelegate) {
      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
    })


app.controller('Controller', function($scope, $ionicSideMenuDelegate) {
    })


app.controller('ChatController', function($scope, $ionicSideMenuDelegate) {
    })


app.controller('ChatSingleController', function($scope, $ionicSideMenuDelegate) {
    })


app.controller('DrinkController', function($scope, $ionicSideMenuDelegate) {
    })


app.controller('TabOneController', function($scope, $ionicSideMenuDelegate) {
    })


app.controller('TabTwoController', function($scope, $ionicSideMenuDelegate) {
    })


app.controller('TabThreeController', function($scope, $ionicSideMenuDelegate) {
    })


//First Tab Controller
app.controller('FirstController', function($scope, $ionicSideMenuDelegate, $state) {
        $scope.login = function(){
            $state.go('login');
        }
        $scope.register = function(){
            $state.go('registration');
        }
    })


//Login Page Controller
app.controller('LoginController', function($scope, $ionicSideMenuDelegate, $state) {
        $scope.success = function(){
            $state.go('menu.round');
        }
    })


// Flights Controller RoundTrip
.controller('RoundController', function($scope, $http, $state,$ionicSideMenuDelegate) {
    $scope.flightDetails = function(){
      var from = document.getElementById("from").value;
      var to = document.getElementById("to").value;
      var departDate = document.getElementById('departDate').value;
      var arrDate = document.getElementById('arrDate').value;
      var adult = document.getElementById('adult').value;
      var airlineCode = document.getElementById("airlineCode");
      var airlinesName = airlineCode.options[airlineCode.selectedIndex].value;
      var airlineCodeFinal = "";
      var fromIATA;
      var toIATA;
      for (var i = 0; i < result.length; i++) {
        if(from == result[i].label)
          {
            fromIATA = result[i].id;
            
          }
      }

      for (var i = 0; i < result.length; i++) {
        if(to == result[i].label)
          {
            toIATA = result[i].id;
            
          }
      }
      
      for (var i = 0; i < airlineInfo.length; i++) {

        if(airlinesName == airlineInfo[i].AirlineName){
          
          airlineCodeFinal = airlineInfo[i].AirlineCode;
          
        }
      }
     
          
      var flightPreference = '';
      
     if(airlineCodeFinal!=""){
      
      flightPreference = "<VendorPref Code=\""+airlineCodeFinal+"\" PreferLevel=\"Only\"/>";
     }
      
      var getFlightData = {
        "async": true,
        "crossDomain": true,
        "url": "https://webservices-as.havail.sabre.com/",
        "method": "POST",
        "headers": {
          "content-type": "text/xml",
          "cache-control": "no-cache",
          
        },
        "data": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\r\n   <soapenv:Header>\r\n      <MessageHeader xmlns=\"http://www.ebxml.org/namespaces/messageHeader\">\r\n         <From>\r\n            <PartyId type=\"urn:x12.org:IO5:01\">CRS</PartyId>\r\n         </From>\r\n         <To>\r\n            <PartyId type=\"urn:x12.org:IO5:01\">Sabre</PartyId>\r\n         </To>\r\n         <CPAId>R7OI</CPAId>\r\n         <ConversationId>9999</ConversationId>\r\n         <Service type=\"string\">Cruise</Service>\r\n         <Action>BargainFinderMaxRQ</Action>\r\n         <MessageData>\r\n            <MessageId>1426190858</MessageId>\r\n            <Timestamp>2015-03-12T02:07:38-06:00</Timestamp>\r\n            <TimeToLive>2015-03-12T03:07:38-06:00</TimeToLive>\r\n         </MessageData>\r\n      </MessageHeader>\r\n      <wsse:Security xmlns:wsse=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" xmlns:wsu=\"http://schemas.xmlsoap.org/ws/2002/12/utility\">\r\n           <wsse:BinarySecurityToken  valueType=\"String\" EncodingType=\"wsse:Base64Binary\">"+securityToken+"</wsse:BinarySecurityToken>\r\n      </wsse:Security>\r\n   </soapenv:Header>\r\n   <soapenv:Body>\r\n   \r\n   <OTA_AirLowFareSearchRQ xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" xmlns=\"http://www.opentravel.org/OTA/2003/05\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" Target=\"Production\" Version=\"1.9.5\" ResponseType=\"OTA\" ResponseVersion=\"1.9.5\">\r\n    <POS>\r\n        <Source PseudoCityCode=\"R7OI\">\r\n        <RequestorID ID=\"1\" Type=\"1\">\r\n            <CompanyName Code=\"TN\" />\r\n        </RequestorID>\r\n        </Source>\r\n    </POS>\r\n    <OriginDestinationInformation RPH=\"1\">\r\n        <DepartureDateTime>"+departDate+"T00:00:00</DepartureDateTime>\r\n        <OriginLocation LocationCode=\""+fromIATA+"\" />\r\n        <DestinationLocation LocationCode=\""+toIATA+"\" />\r\n\t\t\r\n        <TPA_Extensions>\r\n            <SegmentType Code=\"O\" />\r\n        </TPA_Extensions>\r\n\t\t\r\n    </OriginDestinationInformation>\r\n    <OriginDestinationInformation RPH=\"2\">\r\n        <DepartureDateTime>"+arrDate+"T00:00:00</DepartureDateTime>\r\n        <OriginLocation LocationCode=\""+toIATA+"\" />\r\n        <DestinationLocation LocationCode=\""+fromIATA+"\" />\r\n        <TPA_Extensions>\r\n            <SegmentType Code=\"O\" />\r\n        </TPA_Extensions>\r\n\t\r\n    </OriginDestinationInformation>\r\n    \r\n  <TravelPreferences ValidInterlineTicket=\"true\">\r\n"+flightPreference+"\
        <CabinPref PreferLevel=\"Preferred\" Cabin=\"Y\" />\
        <TPA_Extensions>\
            <TripType Value=\"Return\" />\
            <LongConnectTime Min=\"0\" Max=\"999\" Enable=\"true\" />\
            <ExcludeCallDirectCarriers Enabled=\"true\" />\
        </TPA_Extensions>\
    </TravelPreferences>  <TravelerInfoSummary>\r\n        <SeatsRequested>1</SeatsRequested>\r\n        <AirTravelerAvail>\r\n            \t<PassengerTypeQuantity Code=\"ADT\" Quantity= \""+adult+"\" />\r\n\t\t\t \r\n        </AirTravelerAvail>\r\n    </TravelerInfoSummary>\r\n    <TPA_Extensions>\r\n        <IntelliSellTransaction>\r\n            <RequestType Name=\"50ITINS\" />\r\n        </IntelliSellTransaction>\r\n    </TPA_Extensions>\r\n</OTA_AirLowFareSearchRQ>\r\n\r\n    </soapenv:Body>\r\n</soapenv:Envelope>"
}
//Making AJAX Request for data of flights
$.ajax(getFlightData).done(function(response){
      var pricedItineraries = response.getElementsByTagName("PricedItineraries")[0].childNodes;

        for (var i = 0; i < pricedItineraries.length; i++) {
          
          var totalFare = pricedItineraries[i].getElementsByTagName("ItinTotalFare")[0].getElementsByTagName("TotalFare")[0].getAttribute("Amount");
          
          var originDestinationOptions = pricedItineraries[i].getElementsByTagName("AirItinerary")[0].getElementsByTagName("OriginDestinationOptions")[0];
          
          var tempArray = [];
          for (var j = 0; j < originDestinationOptions.childNodes.length; j++) {
            var originDestinationOption = originDestinationOptions.childNodes[j].childNodes;
            
            for (var k = 0; k < originDestinationOption.length; k++) {              
              var departureAirport = originDestinationOption[k].getElementsByTagName("DepartureAirport")[0].getAttribute("LocationCode");
              var departureDateTime = originDestinationOption[k].getAttribute("DepartureDateTime");
              var arrivalAirport = originDestinationOption[k].getElementsByTagName("ArrivalAirport")[0].getAttribute("LocationCode");
              var arrivalDateTime = originDestinationOption[k].getAttribute("ArrivalDateTime");
              var elapsedTime = originDestinationOption[k].getAttribute("ElapsedTime");
              var flightNumber = originDestinationOption[k].getAttribute("FlightNumber");
              var flightCode = originDestinationOption[k].getElementsByTagName("MarketingAirline")[0].getAttribute("Code");

              var res1 = departureDateTime.split("T");
              var departureDate = res1[0];
              var departureTime = res1[1];
              var res2 = arrivalDateTime.split("T");
              var arrivalDate = res2[0];
              var arrivalTime = res2[1];

              var resultObj = {departureAirport, departureDate, departureTime, arrivalAirport, arrivalDate, arrivalTime, elapsedTime, totalFare, flightCode, flightNumber};
              tempArray.push(resultObj);
              
            }
            
          }
         
          resultData.push(tempArray);
          
        }
        $state.go('menu.flightdetails');
    })


       
  }
         
    



    //Authenticating for token
    var auth = {
  "async": true,
  "crossDomain": true,
  "url": "https://webservices-as.havail.sabre.com/",
  "method": "POST",
  "headers": {
    "content-type": "text/xml",
    "cache-control": "no-cache",
    
  },
  "data":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\t\t<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:eb=\"http://www.ebxml.org/namespaces/messageHeader\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:xsd=\"http://www.w3.org/1999/XMLSchema\">\r\n\t\t    <SOAP-ENV:Header>\r\n\t\t        <eb:MessageHeader SOAP-ENV:mustUnderstand=\"1\" eb:version=\"1.0\">\r\n\t\t            <eb:ConversationId>99999</eb:ConversationId>\r\n\t\t            <eb:From>\r\n\t\t                <eb:PartyId type=\"urn:x12.org:IO5:01\">999999</eb:PartyId>\r\n\t\t            </eb:From>\r\n\t\t            <eb:To>\r\n\t\t                <eb:PartyId type=\"urn:x12.org:IO5:01\">123123</eb:PartyId>\r\n\t\t            </eb:To>\r\n\t\t            <eb:CPAId>R7OI</eb:CPAId>\r\n\t\t            <eb:Service eb:type=\"OTA\">SessionCreateRQ</eb:Service>\r\n\t\t            <eb:Action>SessionCreateRQ</eb:Action>\r\n\t\t            <eb:MessageData>\r\n\t\t                <eb:MessageId>1000</eb:MessageId>\r\n\t\t                <eb:Timestamp>2001-02-15T11:15:12Z</eb:Timestamp>\r\n\t\t                <eb:TimeToLive>2001-02-15T11:15:12Z</eb:TimeToLive>\r\n\t\t            </eb:MessageData>\r\n\t\t        </eb:MessageHeader>\r\n\t\t        <wsse:Security xmlns:wsse=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" xmlns:wsu=\"http://schemas.xmlsoap.org/ws/2002/12/utility\">\r\n\t\t            <wsse:UsernameToken> \r\n\t\t                <wsse:Username>595258</wsse:Username>\r\n\t\t                <wsse:Password>WS500917</wsse:Password>\r\n\t\t                <Organization>R7OI</Organization>\r\n\t\t                <Domain>DEFAULT</Domain> \r\n\t\t            </wsse:UsernameToken>\r\n\t\t        </wsse:Security>\r\n\t\t    </SOAP-ENV:Header>\r\n\t\t    <SOAP-ENV:Body>\r\n\t\t        <eb:Manifest SOAP-ENV:mustUnderstand=\"1\" eb:version=\"1.0\">\r\n\t\t            <eb:Reference xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"cid:rootelement\" xlink:type=\"simple\"/>\r\n\t\t        </eb:Manifest>\r\n\t\t    </SOAP-ENV:Body>\r\n\t\t</SOAP-ENV:Envelope>"
}

$.ajax(auth).done(function(response){
  securityToken = response.getElementsByTagName("BinarySecurityToken")[0].childNodes[0].nodeValue;
  console.log(securityToken);
  })
  



        // Getting list of Airlines
    
      $http({
        method: "GET",
        url: "js/airlines.json",
        headers: {
          "Content-Type" : "application/x-www-form-urlencoded"
        }
      }).then(function(response){

      $scope.airlineInfo = response.data.AirlineInfo;
      airlineInfo = $scope.airlineInfo;
      
      var airlineName = [];
      for (var i = 0; i < airlineInfo.length; i++) {
        airlineName.push(airlineInfo[i].AirlineName);
      }
      $scope.airlineName = airlineName; 
    });
    // Getting list of Airports
    $http({
      method: "GET",
      url: "js/airports.json",
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
    }).then(function(response){
      result = response.data;
      for (var i = 0; i < result.length; i++) {
          destinationName.push(result[i].label);
          destinationIATA.push(result[i].id);
      }
      $("#from").autocomplete({
        source: destinationName
      })
      $("#to").autocomplete({
        source: destinationName
      })
    });
})
// Flights Controller End


// Single Trip Controller
.controller('SingleController', function($scope, $http, $state,$ionicSideMenuDelegate) {
    $scope.flightDetails = function(){
      var from = document.getElementById("from").value;
      var to = document.getElementById("to").value;
      var departDate = document.getElementById('departDate').value;
      var adult = document.getElementById('adult').value;
      var airlineCode = document.getElementById("airlineCode");
      var airlinesName = airlineCode.options[airlineCode.selectedIndex].value;
      var airlineCodeFinal = "";
      var fromIATA;
      var toIATA;
      for (var i = 0; i < result.length; i++) {
        if(from == result[i].label)
          {
            fromIATA = result[i].id;
            
          }
      }

      for (var i = 0; i < result.length; i++) {
        if(to == result[i].label)
          {
            toIATA = result[i].id;
            
          }
      }
      
      for (var i = 0; i < airlineInfo.length; i++) {

        if(airlinesName == airlineInfo[i].AirlineName){
          
          airlineCodeFinal = airlineInfo[i].AirlineCode;
          
        }
      }
     
          
      var flightPreference = '';
      
     if(airlineCodeFinal!=""){
      
      flightPreference = "<VendorPref Code=\""+airlineCodeFinal+"\" PreferLevel=\"Only\"/>";
     }
      
      var getFlightData = {
        "async": true,
        "crossDomain": true,
        "url": "https://webservices-as.havail.sabre.com/",
        "method": "POST",
        "headers": {
          "content-type": "text/xml",
          "cache-control": "no-cache",
          
        },
        "data": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\r\n   <soapenv:Header>\r\n      <MessageHeader xmlns=\"http://www.ebxml.org/namespaces/messageHeader\">\r\n         <From>\r\n            <PartyId type=\"urn:x12.org:IO5:01\">CRS</PartyId>\r\n         </From>\r\n         <To>\r\n            <PartyId type=\"urn:x12.org:IO5:01\">Sabre</PartyId>\r\n         </To>\r\n         <CPAId>R7OI</CPAId>\r\n         <ConversationId>9999</ConversationId>\r\n         <Service type=\"string\">Cruise</Service>\r\n         <Action>BargainFinderMaxRQ</Action>\r\n         <MessageData>\r\n            <MessageId>1426190858</MessageId>\r\n            <Timestamp>2015-03-12T02:07:38-06:00</Timestamp>\r\n            <TimeToLive>2015-03-12T03:07:38-06:00</TimeToLive>\r\n         </MessageData>\r\n      </MessageHeader>\r\n      <wsse:Security xmlns:wsse=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" xmlns:wsu=\"http://schemas.xmlsoap.org/ws/2002/12/utility\">\r\n           <wsse:BinarySecurityToken  valueType=\"String\" EncodingType=\"wsse:Base64Binary\">"+securityToken+"</wsse:BinarySecurityToken>\r\n      </wsse:Security>\r\n   </soapenv:Header>\r\n   <soapenv:Body>\r\n   \r\n   <OTA_AirLowFareSearchRQ xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" xmlns=\"http://www.opentravel.org/OTA/2003/05\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" Target=\"Production\" Version=\"1.9.5\" ResponseType=\"OTA\" ResponseVersion=\"1.9.5\">\r\n    <POS>\r\n        <Source PseudoCityCode=\"R7OI\">\r\n        <RequestorID ID=\"1\" Type=\"1\">\r\n            <CompanyName Code=\"TN\" />\r\n        </RequestorID>\r\n        </Source>\r\n    </POS>\r\n    <OriginDestinationInformation RPH=\"1\">\r\n        <DepartureDateTime>"+departDate+"T00:00:00</DepartureDateTime>\r\n        <OriginLocation LocationCode=\""+fromIATA+"\" />\r\n        <DestinationLocation LocationCode=\""+toIATA+"\" />\r\n\t\t\r\n        <TPA_Extensions>\r\n            <SegmentType Code=\"O\" />\r\n        </TPA_Extensions>\r\n\t\t\r\n    </OriginDestinationInformation>\r\n    \r\n    \r\n  <TravelPreferences ValidInterlineTicket=\"true\">\r\n"+flightPreference+"\
        <CabinPref PreferLevel=\"Preferred\" Cabin=\"Y\" />\
        <TPA_Extensions>\
            <TripType Value=\"Return\" />\
            <LongConnectTime Min=\"0\" Max=\"999\" Enable=\"true\" />\
            <ExcludeCallDirectCarriers Enabled=\"true\" />\
        </TPA_Extensions>\
    </TravelPreferences>  <TravelerInfoSummary>\r\n        <SeatsRequested>1</SeatsRequested>\r\n        <AirTravelerAvail>\r\n            \t<PassengerTypeQuantity Code=\"ADT\" Quantity= \""+adult+"\" />\r\n\t\t\t \r\n        </AirTravelerAvail>\r\n    </TravelerInfoSummary>\r\n    <TPA_Extensions>\r\n        <IntelliSellTransaction>\r\n            <RequestType Name=\"50ITINS\" />\r\n        </IntelliSellTransaction>\r\n    </TPA_Extensions>\r\n</OTA_AirLowFareSearchRQ>\r\n\r\n    </soapenv:Body>\r\n</soapenv:Envelope>"
}
//Making AJAX Request for data of flights
$.ajax(getFlightData).done(function(response){
      var pricedItineraries = response.getElementsByTagName("PricedItineraries")[0].childNodes;

        for (var i = 0; i < pricedItineraries.length; i++) {
          
          var totalFare = pricedItineraries[i].getElementsByTagName("ItinTotalFare")[0].getElementsByTagName("TotalFare")[0].getAttribute("Amount");
          
          var originDestinationOptions = pricedItineraries[i].getElementsByTagName("AirItinerary")[0].getElementsByTagName("OriginDestinationOptions")[0];
          
          var tempArray = [];
          for (var j = 0; j < originDestinationOptions.childNodes.length; j++) {
            var originDestinationOption = originDestinationOptions.childNodes[j].childNodes;
            
            for (var k = 0; k < originDestinationOption.length; k++) {
            
              
              var departureAirport = originDestinationOption[k].getElementsByTagName("DepartureAirport")[0].getAttribute("LocationCode");
              var departureDateTime = originDestinationOption[k].getAttribute("DepartureDateTime");
              var arrivalAirport = originDestinationOption[k].getElementsByTagName("ArrivalAirport")[0].getAttribute("LocationCode");
              
              var elapsedTime = originDestinationOption[k].getAttribute("ElapsedTime");
              var flightNumber = originDestinationOption[k].getAttribute("FlightNumber");
              var flightCode = originDestinationOption[k].getElementsByTagName("MarketingAirline")[0].getAttribute("Code");

              var res1 = departureDateTime.split("T");
              var departureDate = res1[0];
              var departureTime = res1[1];
              

              var resultObj = {departureAirport, departureDate, departureTime, arrivalAirport, elapsedTime, totalFare, flightCode, flightNumber};
              tempArray.push(resultObj);
              
            }
            
          }
          resultData.push(tempArray);
          
        }
        $state.go('menu.flightdetails');
    })


       
  }
         
    



    //Authenticating for token
    var auth = {
  "async": true,
  "crossDomain": true,
  "url": "https://webservices-as.havail.sabre.com/",
  "method": "POST",
  "headers": {
    "content-type": "text/xml",
    "cache-control": "no-cache",
    
  },
  "data":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\t\t<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:eb=\"http://www.ebxml.org/namespaces/messageHeader\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:xsd=\"http://www.w3.org/1999/XMLSchema\">\r\n\t\t    <SOAP-ENV:Header>\r\n\t\t        <eb:MessageHeader SOAP-ENV:mustUnderstand=\"1\" eb:version=\"1.0\">\r\n\t\t            <eb:ConversationId>99999</eb:ConversationId>\r\n\t\t            <eb:From>\r\n\t\t                <eb:PartyId type=\"urn:x12.org:IO5:01\">999999</eb:PartyId>\r\n\t\t            </eb:From>\r\n\t\t            <eb:To>\r\n\t\t                <eb:PartyId type=\"urn:x12.org:IO5:01\">123123</eb:PartyId>\r\n\t\t            </eb:To>\r\n\t\t            <eb:CPAId>R7OI</eb:CPAId>\r\n\t\t            <eb:Service eb:type=\"OTA\">SessionCreateRQ</eb:Service>\r\n\t\t            <eb:Action>SessionCreateRQ</eb:Action>\r\n\t\t            <eb:MessageData>\r\n\t\t                <eb:MessageId>1000</eb:MessageId>\r\n\t\t                <eb:Timestamp>2001-02-15T11:15:12Z</eb:Timestamp>\r\n\t\t                <eb:TimeToLive>2001-02-15T11:15:12Z</eb:TimeToLive>\r\n\t\t            </eb:MessageData>\r\n\t\t        </eb:MessageHeader>\r\n\t\t        <wsse:Security xmlns:wsse=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" xmlns:wsu=\"http://schemas.xmlsoap.org/ws/2002/12/utility\">\r\n\t\t            <wsse:UsernameToken> \r\n\t\t                <wsse:Username>595258</wsse:Username>\r\n\t\t                <wsse:Password>WS500917</wsse:Password>\r\n\t\t                <Organization>R7OI</Organization>\r\n\t\t                <Domain>DEFAULT</Domain> \r\n\t\t            </wsse:UsernameToken>\r\n\t\t        </wsse:Security>\r\n\t\t    </SOAP-ENV:Header>\r\n\t\t    <SOAP-ENV:Body>\r\n\t\t        <eb:Manifest SOAP-ENV:mustUnderstand=\"1\" eb:version=\"1.0\">\r\n\t\t            <eb:Reference xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"cid:rootelement\" xlink:type=\"simple\"/>\r\n\t\t        </eb:Manifest>\r\n\t\t    </SOAP-ENV:Body>\r\n\t\t</SOAP-ENV:Envelope>"
}

$.ajax(auth).done(function(response){
  securityToken = response.getElementsByTagName("BinarySecurityToken")[0].childNodes[0].nodeValue;
  })
  


 

        // Getting list of Airlines

      $http({
        method: "GET",
        url: "js/airlines.json",
        headers: {
          "Content-Type" : "application/x-www-form-urlencoded"
        }
      }).then(function(response){

      $scope.airlineInfo = response.data.AirlineInfo;
      airlineInfo = $scope.airlineInfo;
      
      var airlineName = [];

      for (var i = 0; i < airlineInfo.length; i++) {
        airlineName.push(airlineInfo[i].AirlineName);
      }
      $scope.airlineName = airlineName; 
    });
    // Getting list of Airports
    $http({
      method: "GET",
      url: "js/airports.json",
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
    }).then(function(response){
      result = response.data;
      for (var i = 0; i < result.length; i++) {
          destinationName.push(result[i].label);
          destinationIATA.push(result[i].id);
      }
      $("#from").autocomplete({
        source: destinationName
      })
      $("#to").autocomplete({
        source: destinationName
      })
    });
})
//Single Flights Controller End

//Flight Detail Controller
app.controller('FlightDetailController', function($scope, $ionicSideMenuDelegate, $state) {
  
        $scope.finalData = resultData;
        $scope.toConfirm = function($index){
          selectedFlight = $scope.finalData[$index];
          $state.go('menu.flightconfirmation');
        }
        $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
    })
//FLight Detail Controller End

//Flight COnfrimation Controller
app.controller('FlightConfirmationController', function($scope, $ionicSideMenuDelegate, $state) {
      $scope.selectedFlight = selectedFlight;
      $scope.toUserDetails = function(){
        $state.go('menu.userdetails');
      }
    })
//Flight Confirmation Controller End

//User Details Controller
app.controller('UserDetailsController', function($scope, $ionicSideMenuDelegate, $state, $http) {
      $http({
        method: "GET",
        url: "js/countrycodes.json",
        headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
      }).then(function(response){
        
        $scope.countryCodes = response.data;
        
      });
      $scope.toPayment = function(){
        $state.go('menu.paymentmethod');
      }
    })
//User Details Controller End

//Payment Method Controller
app.controller('PaymentMethodController', function($scope, $ionicSideMenuDelegate, $state, $http) {
      $http({
        method: "GET",
        url: "js/countrycodes.json",
        headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
      }).then(function(response){
        
        $scope.countryCodes = response.data;
        
      });
    })
//Payment Method Controller End

//MultiCity Controller
app.controller('MutliCityController', function($scope, $ionicSideMenuDelegate, $http) {
      
      //Addind/Removing Flights
      $scope.inputs = [{value: null}];
      $scope.addMore = function(index){
        var limit = index + 2;
        if(limit <= 4){
          $scope.inputs.push({value: null});
        }
        else {
          alert("Cannot add more");
        }
        
      }
      $scope.removeMore = function (index) {
        $scope.inputs.splice(index, 1);
      }


      // Getting list of Airlines
      $http({
        method: "GET",
        url: "js/airlines.json",
        headers: {
          "Content-Type" : "application/x-www-form-urlencoded"
        }
      }).then(function(response){

      $scope.airlineInfo = response.data.AirlineInfo;
      var airlineInfo = $scope.airlineInfo;
      
      var airlineName = [];

      for (var i = 0; i < airlineInfo.length; i++) {
        airlineName.push(airlineInfo[i].AirlineName);
      }
      $scope.airlineName = airlineName; 
    });


    // Getting list of Airports
    $http({
      method: "GET",
      url: "js/airports.json",
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
    }).then(function(response){
      result = response.data;
      for (var i = 0; i < result.length; i++) {
          destinationName.push(result[i].label);
          destinationIATA.push(result[i].id);
      }
      $("#from").autocomplete({
        source: destinationName
      })
      $("#to").autocomplete({
        source: destinationName
      })
    });
    })