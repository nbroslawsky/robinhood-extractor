# Exporting data from Robinhood into Google Sheets

1. Log into Robinhood and open up Chrome Developer Tools
2. Go to the network tab and filter the requests for `orders`
3. Right click on one of those entries, and copy the response (it'll be a json string)
4. Paste that json string into a file in this directory called `export.json` (which is already added to .gitignore)
5. Run `node exporter.js`
6. Go to Google Sheets, and you can import that resulting csv file (`export.csv`) into your spreadsheet.
7. Do whatever calculations you like on other sheets (I choose to `=QUERY()` the main sheet so that I can re-import new data overtop of it at will)

#Spreadsheet

I have two additional tabs on that spreadsheet for aggregating data:

* *Purchases*: `=QUERY(export!A:AG, "SELECT H, I, H*I WHERE M='buy' LABEL H 'Quantity', I 'Executed Price', H*I 'Total Cost'")`
* *Sales*: `=QUERY(export!A:AG, "SELECT H, I, H*I WHERE M='sell' LABEL H 'Quantity', I 'Executed Price', H*I 'Total Cost'")`

Similarly, I can use those two sheets to do basic calculations like:

* *Total Purchases*: `=IFERROR(QUERY(Purchases!A:C, "SELECT SUM(C) LABEL SUM(C) ''", -1),0)`
* *Total Sales*: `=IFERROR(QUERY(Sales!A:C, "SELECT SUM(C) LABEL SUM(C) ''", -1),0)`