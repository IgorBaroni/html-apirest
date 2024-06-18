let arr = [];
arr.push(["Dispositivo", "Total"]);

function getData() {
  fetch("http://127.0.0.1:5000/monitoramento/grafico1")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i <= 4; i++) {
        let element = [data[i].dispositivo, data[i].TotalRegistros];
        arr.push(element);
      }
      drawMeasurerChart();
    })
    .catch((error) => console.error("Erro ao obter dados:", error));
}

getData();

function drawMeasurerChart() {
  google.charts.load('current', {'packages':['gauge']});
  google.charts.setOnLoadCallback(function () {
    var data = google.visualization.arrayToDataTable(arr);
    // Temperatura, Umidade e Luz
    var options = {
      width: 400, height: 120,
      redFrom: 90, redTo: 100,
      yellowFrom:75, yellowTo: 90,
      minorTicks: 5
    };

    var chart = new google.visualization.Gauge(
      document.getElementById("measurer")
    );

    chart.draw(data, options);

    setInterval(function() {
      data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
      chart.draw(data, options);
    }, 13000);
    setInterval(function() {
      data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
      chart.draw(data, options);
    }, 5000);
    setInterval(function() {
      data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
      chart.draw(data, options);
    }, 26000);
  });
}
