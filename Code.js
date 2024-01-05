var ss = SpreadsheetApp.getActiveSpreadsheet();
var lovSheet = ss.getSheetByName("LOV");

function getParameter(parameter) {
  return parameter ? parameter.toString() : '';
}

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
  var downtime = getParameter(e.parameters.downtime);

  AddRecord(name, Plants, Product_Line, Product, Product_Spec, Color, Size, ItemNumberVal, MasterItem, cycles, seconds, garbage, starttime, endtime, DateSelector, downtime);

  var htmlOutput = HtmlService.createTemplateFromFile('DependentSelect');
  htmlOutput.message = 'Record Added';

  
  // Retrieve and set dataToInject
  var dataToInject = fillData();
  htmlOutput.dataToInject = JSON.stringify(dataToInject);

  return htmlOutput.evaluate(); 
}



// Cache the data for a longer duration, adjust as needed

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

function doGet(e) {
  var htmlOutput =  HtmlService.createTemplateFromFile('DependentSelect');
  htmlOutput.message = '';
  var dataToInject = fillData(); // Replace with your data retrieval function
  htmlOutput.dataToInject = JSON.stringify(dataToInject); // Convert data to JSON for safe injection
  return htmlOutput.evaluate();
}


function AddRecord(name, Plants, Product_Line, Product, Product_Spec, Color, Size, ItemNumberVal, MasterItem, cycles, seconds, garbage, starttime, endtime, DateSelector, downtime) {
  var dataSheet = ss.getSheetByName("DATA");
  dataSheet.appendRow([name, Plants, Product_Line, Product, Product_Spec, Color, Size, ItemNumberVal, MasterItem, cycles, seconds, garbage, starttime, endtime, DateSelector, downtime, new Date()]);
}

function getUrl() {
 var url = ScriptApp.getService().getUrl();
 return url;
}