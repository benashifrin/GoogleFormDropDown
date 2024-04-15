var ss = SpreadsheetApp.getActiveSpreadsheet();
var lovSheet = ss.getSheetByName("LOV");

function getParameter(parameter) {
  return parameter ? parameter.toString() : '';
}
// Stores values from HTML Form
function doPost(e) {
  var name = getParameter(e.parameters.name);
  var Plants = getParameter(e.parameters.Plants);
  var Product_Line = getParameter(e.parameters.Product_Line);
  var Product = getParameter(e.parameters.Product);
  var Product_Spec = getParameter(e.parameters.Product_Spec);
  var Color = getParameter(e.parameters.Color);
  var Size = getParameter(e.parameters.Size);
  var ItemNumberVal = getParameter(e.parameters.ItemNumberVal);
  var MasterItem = getParameter(e.parameters.MasterItem);
  var cycles = getParameter(e.parameters.cycles);
  var seconds = getParameter(e.parameters.seconds);
  var garbage = getParameter(e.parameters.garbage);
  var starttime = getParameter(e.parameters.starttime);
  var endtime = getParameter(e.parameters.endtime);
  var DateSelector = getParameter(e.parameters.DateSelector);
  var downtime1 = getParameter(e.parameters.downtime1);
  var downtime2 = getParameter(e.parameters.downtime2);
  var downtime3 = getParameter(e.parameters.downtime3);
  var downtime4 = getParameter(e.parameters.downtime4);
  var downtime5 = getParameter(e.parameters.downtime5);
  var duration1 = getParameter(e.parameters.duration1);
  var duration2 = getParameter(e.parameters.duration2);
  var duration3 = getParameter(e.parameters.duration3);
  var duration4 = getParameter(e.parameters.duration4);
  var duration5 = getParameter(e.parameters.duration5);
  var date = new Date();
  var currentDate  = Utilities.formatDate(date, 'America/Chicago', "M/d/yyyy HH:mm:ss");
  AddRecord(name, Plants, Product_Line, Product, Product_Spec, Color, Size, ItemNumberVal, MasterItem, cycles, seconds, garbage, starttime, endtime, DateSelector, downtime1, downtime2, downtime3, downtime4, downtime5, duration1, duration2, duration3, duration4, duration5, currentDate);

  var htmlOutput = HtmlService.createTemplateFromFile('DependentSelect');
  htmlOutput.message = 'Record Added';

  
  // Retrieve and set dataToInject
  var dataToInject = fillData();
  htmlOutput.dataToInject = JSON.stringify(dataToInject);

  return htmlOutput.evaluate(); 
}



// ,Fill values with N/A
function fillData() {
  var range = lovSheet.getRange(2, 1, lovSheet.getLastRow(), 7);
  var values = range.getValues();
  Logger.log(values)
  // Fill blanks with 'N/A'
  for (var r = 1; r < values.length; r++) {
    for (var c = 0; c < values[r].length; c++) {
      if (values[r][c] === "") {
        values[r][c] = 'N/A';
      }
    }
  }


  return values;
}

// Initialize filledData using cached data
var filledData = fillData();
//Helper function for append
function doGet(e) {
  var htmlOutput =  HtmlService.createTemplateFromFile('DependentSelect');
  htmlOutput.message = '';
  var dataToInject = fillData(); // Replace with your data retrieval function
  htmlOutput.dataToInject = JSON.stringify(dataToInject); // Convert data to JSON for safe injection
  return htmlOutput.evaluate();
}

//actual function that appends data
function AddRecord(name, Plants, Product_Line, Product, Product_Spec, Color, Size, ItemNumberVal, MasterItem, cycles, seconds, garbage, starttime, endtime, DateSelector, downtime1, downtime2, downtime3, downtime4, downtime5, duration1, duration2, duration3, duration4, duration5, currentDate) {
  var dataSheet = ss.getSheetByName("PRODFINAL");
  dataSheet.appendRow([name, Plants, Product_Line, Product, Product_Spec, Color, Size, ItemNumberVal, MasterItem, cycles, seconds, garbage, starttime, endtime, DateSelector, downtime1, duration1, downtime2, duration2, downtime3, duration3, downtime4, duration4, downtime5, duration5, currentDate]);

}

function getUrl() {
 var url = ScriptApp.getService().getUrl();
 return url;
}