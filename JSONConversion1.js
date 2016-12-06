var fs=require('fs');
var lineReader = require('readline').createInterface({
  input: fs.createReadStream('FoodFacts.csv')
});
var dataArray=[],regionArray=[];
var indexCountry=0,indexFat=0,indexProtein=0,indexCarbo=0;
var country = 0,i = 0,fat = 0,protein =0,carbohydrate=0,j=0,region1="",northlen=0,centrallen=0,southlen=0;
var northEurope = ['United Kingdom' , 'Denmark' , 'Sweden' , 'Norway'];
var centralEurope = ['France','Belgium' , 'Germany' , ' Switzerland' , 'Netherlands'];
var southEurope = ['Portugal', 'Greece' , 'Italy' , 'Spain' , 'Croatia' , 'Albania'];
var group = ['NorthernEurope','CentralEurope','SouthernEurope'];
var temp = "";
var addfat = 0,addprotein = 0,addcarbohydrate = 0;
var finalRegion = [];
function regionChart(regions,fats,proteins,carbohydrates){
  this.regions=regions;
  this.fats=fats;
  this.proteins=proteins;
  this.carbohydrates=carbohydrates;
};
lineReader.on('line', function (line) {
  k=0,k1=0,k2=0,k3=0;
  dataArray=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  while(i<1) {
    indexCountry=dataArray.indexOf('countries_en');
    indexFat=dataArray.indexOf('fat_100g');
    indexProtein=dataArray.indexOf('proteins_100g');
    indexCarbo=dataArray.indexOf('carbohydrates_100g');
    i++;
  }
  country=dataArray[indexCountry];
  fat=dataArray[indexFat];
  protein=dataArray[indexProtein];
  carbohydrate=dataArray[indexCarbo];
   if(country=="")
   {
     country="N";
   }
   if(fat=="") {
     fat=0;
   }
   if(protein=="")
   {
     protein=0;
   }
   if(carbohydrate=="")
   {
     carbohydrate=0;
   }
    northlen=northEurope.length;
    while(k1>=0 && k1<northlen)
    {
     if((country).includes(northEurope[k1]))
       region1="NorthernEurope";
     k1++;
   }
   centrallen=centralEurope.length;
   while(k2>=0&&k2<centrallen)
   {
     if((country).includes(centralEurope[k2]))
       region1="CentralEurope";
     k2++;
   }
   southlen=southEurope.length;
   while(k3>=0&&k3<southlen)
   {
     if((country).includes(southEurope[k3]))
       region1='SouthernEurope';
     k3++;
   }
   if(region1){
     regionArray.push(new regionChart(region1,fat,protein,carbohydrate));
   }
 });
lineReader.on('close', function() {
  for(var m=0;m<group.length;m++)
  {
    addfat=0;
    addprotein=0;
    addcarbohydrate=0;
    for(var n=0;n<regionArray.length;n++){
      if((regionArray[n].regions).includes(group[m]))
      {
        temp=group[m];
        addfat=addfat+parseFloat(regionArray[n].fats);
        addprotein=addprotein+parseFloat(regionArray[n].proteins);
        addcarbohydrate=addcarbohydrate+parseFloat(regionArray[n].carbohydrates);
      }
    }
    finalRegion.push(new regionChart(temp,addfat.toFixed(2),addprotein.toFixed(2),addcarbohydrate.toFixed(2)));
  }
console.log(JSON.stringify(finalRegion));
fs.writeFileSync('JSONforregion.json', JSON.stringify(finalRegion) , 'utf-8');
});
