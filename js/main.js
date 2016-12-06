$( document ).ready(function() {

  FirstGraph();
  SecondGraph();
  //var ItampaArray = Itampa.reverse();

});

function outputUpdatePlotis(vol) {
	document.querySelector('#PlotisVal').value = vol + "mm";
}
function outputUpdateIlgis(vol) {
	document.querySelector('#IlgisVal').value = vol + "mm";
}

function generateGraph(){
  var plotis = document.querySelector('#PlotisVal').value;
  plotis = plotis.slice(0, -2);
  plotis *= 0.001;
  var ilgis = document.querySelector('#IlgisVal').value;
  ilgis = ilgis.slice(0, -2);
  ilgis *= 0.001;
  RGraph.Reset(document.getElementById('cvd'))
  SecondGraph(plotis, ilgis);
}

function FirstGraph() {
  var Temp = 30;
  var TempArray = new Array;
  for (var i = 0; i < 13; i++) {
    TempArray[i] = Temp + 10 *i;
  }
  var Itampa = ['0.11', '0.13', '0.18', '0.22', '0.29', '0.40', '0.55', '0.76', '1.06', '1.55', '2.25', '3.42', '5.35'];
  var ItampaArray = Itampa.reverse();
  new RGraph.Line({
      id: 'cvs',
      data: [
          Itampa
      ],
      options: {
          gutterTop: 50,
          gutterLeft: 200,
          colors: ['#333'],
          shadow: false,
          spline: true,
          linewidth: 5,
          ymax: 7,
          scaleDecimals: 1,
          ylabelsCount: 5,
          backgroundGridAutofitNumhlines: 12,
          backgroundGridAutofitNumvlines: 12,
          axisColor: 'gray',
          textSize: 18,
          textAccessible: true,
          numyticks: 6,
          numxticks: 2,
          title: 'Itampos priklausomybe nuo temperaturos',
          tickmarks: null,
          backgroundHbars: [
              [0,5,'rgba(240,240,240,0.25)'],
              [5,5,'rgba(210,210,210,0.25)'],
              [10,5,'rgba(150,150,150,.25)']
          ],
          labels: [
            '30', '40', '50',
            '60', '70', '80',
            '90', '100', '110',
            '120', '130', '140',
            '150'
          ],
          unitsPost: ''
      }
  }).trace2();
}

function SecondGraph(plotis, ilgis) {
  var Itampa = ['0.11', '0.13', '0.18', '0.22', '0.29', '0.40', '0.55', '0.76', '1.06', '1.55', '2.25', '3.42', '5.35'];
  var Stipris = 0.005;
  var Plotas = (plotis * ilgis) || (0.02 * 0.01);
  var Ilgis = ilgis || 0.02;
  var Elaidis = new Array;
  var ElaidisLog = new Array;
  for (var i = 0; i < 13; i++) {
    Elaidis[i] = ((Stipris/Itampa[i])*Ilgis)/(Plotas);
    ElaidisLog[i] = Math.log(Elaidis[i]);
  }
  console.log(Ilgis);
  console.log(Plotas);
  console.log(ElaidisLog);
  new RGraph.Line({
      id: 'cvd',
      data: [
          ElaidisLog
      ],
      options: {
          gutterTop: 50,
          gutterLeft: 200,
          colors: ['#333'],
          shadow: false,
          spline: false,
          linewidth: 5,
          ymin: ElaidisLog[12],
          ymax: ElaidisLog[0],
          scaleDecimals: 1,
          ylabelsCount: 5,
          backgroundGridAutofitNumhlines: 12,
          backgroundGridAutofitNumvlines: 12,
          outofbonds: true,
          axisColor: 'gray',
          textSize: 18,
          textAccessible: true,
          numyticks: 6,
          numxticks: 2,
          title: '',
          tickmarks: null,
          backgroundHbars: [
              [0,5,'rgba(240,240,240,0.25)'],
              [5,5,'rgba(210,210,210,0.25)'],
              [10,5,'rgba(150,150,150,.25)']
          ],
          labels: [
            '2.36', '2.42', '2.48',
            '2.54', '2.61', '2.68',
            '2.75', '2.83', '2.92',
            '3.00', '3.09', '3.19',
            '3.30'
          ],
          unitsPost: ''
      }
  }).trace2();
  var DPJ = (ElaidisLog[0] - ElaidisLog[12])/(0.94*Math.pow(10, -3)) * 2 * 8.167343 * Math.pow(10, -5);
  document.querySelector('#DJPVal').value = DPJ.toFixed(4);
}
