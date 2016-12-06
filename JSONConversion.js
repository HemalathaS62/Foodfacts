var fs=require('fs');
var lineReader = require('readline').createInterface({
  input: fs.createReadStream('FoodFacts.csv')
});
var dataArray=[],regionArray=[];
var indexSugar=0,indexSalt=0,indexCountry=0;
var country = 0,sugar = 0,salt = 0,i = 0,j=0;
var barChart = ['Netherlands', 'Canada', 'United Kingdom' , 'United States' , 'Australia' , 'France' , 'Germany' , 'Spain', 'South Africa'];
var finalCountry = [],sugar_arr = [],salt_arr=[];
for(var j=0;j<barChart.length;j++)
{
  sugar_arr[j]=0;
  salt_arr[j]=0;
}
lineReader.on('line', function (line) {
  k=0,k1=0,k2=0,k3=0;
  dataArray=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  while(i<1) {
    indexCountry=dataArray.indexOf('countries_en');
    indexSugar=dataArray.indexOf('sugars_100g');
    indexSalt=dataArray.indexOf('salt_100g');
    i++;
  }
  country=dataArray[indexCountry];
  sugar=dataArray[indexSugar];
  salt=dataArray[indexSalt];
   if(sugar=="")
   {
     sugar=0;
   }
   if(salt=="")
   {
     salt=0;
   }
   if(country=="")
   {
     country="N";
   }
     var index=barChart.indexOf(country);
     if(index!=-1)
     {
      sugar_arr[index]+=parseFloat(sugar);
      salt_arr[index]+=parseFloat(salt);
    }
 });
lineReader.on('close', function() {
  for(var m=0;m<barChart.length;m++) {
    var json_obj={};
    json_obj["country"]=barChart[m];
    json_obj["Sugar"]=parseFloat(sugar_arr[m].toFixed(2));
    json_obj["salt"]=parseFloat(salt_arr[m].toFixed(2));
    finalCountry.push(json_obj);
    console.log(barChart[m]+" "+sugar_arr[m]+" "+salt_arr[m]);
  }
fs.writeFileSync('JSONforcountry.json', JSON.stringify(finalCountry) , 'utf-8');
});
