var ss = SpreadsheetApp.getActiveSpreadsheet();
var lovSheet = ss.getSheetByName("LOV");

function doPost(e) {
  var name = e.parameters.name.toString();
  var Plants = e.parameters.Plants.toString();
  var Product_Line = e.parameters.Product_Line.toString();
  var Product = e.parameters.Product.toString();
  var Product_Spec = e.parameters.Product_Spec.toString();
  var Color = e.parameters.Color.toString();
  var Size = e.parameters.Size.toString();
  var ItemNumberVal = e.parameters.ItemNumberVal.toString();
  var MasterItem = e.parameters.MasterItem.toString();
  var cycles = e.parameters.cycles.toString();
  var seconds = e.parameters.seconds.toString();
  var garbage = e.parameters.garbage.toString();
  var starttime = e.parameters.starttime.toString();
  var endtime = e.parameters.endtime.toString();
  var DateSelector = e.parameters.DateSelector.toString();
  var downtime = e.parameters.downtime.toString();

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