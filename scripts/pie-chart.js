var feedSource = 'https://boardgames-api.calisaurus.net/api/boardgame/feed';

$.get(feedSource, function(data, status) {
  console.log("Data: ", data, "\nStatus: ", status);
  var result = calculateWinRate(data.feed)
  var coop = calculateCoop(data.feed)
  var total = provideTotal(data.feed)
  var pandemic = calculatePandemic(data.feed)
  console.log(result);
  console.log(coop);
  console.log(total);
  console.log(pandemic.wins);
  console.log(pandemic.losses);
  renderChart(result.hannah, result.john, result.draw, result.other);
  renderCoopChart(coop.coop, coop.versus);
})

function renderChart(hannah, john, draw, other) {
  var chart = document.getElementById("pieChart");
  var pieChart = new Chart(chart, {
    type: 'doughnut',
    data: {
      labels: ["Hannah", "John", "Draw", "Other"],
      datasets: [{
        label: '# of Games',
        backgroundColor: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 3, 1)', 'rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)'],
        lineTension: 0,
        data: [hannah, john, draw, other],
        borderColor: 'rgba(51, 57, 255, 1)',
        borderWidth: 3,
        borderJoinStyle: 'round'
      }]
    }
  });
}

function calculateWinRate(feedData) {
  var result = {}
  result.hannah = feedData.filter(item => item.winner === 'Hannah').length
  result.john = feedData.filter(item => item.winner === 'John').length
  result.draw = feedData.filter(item => item.winner === 'Draw').length
  result.other = feedData.filter(item => item.winner === 'Other' || item.winner === 'X').length
  return result;
}

function renderCoopChart(coop, versus) {
  var total = coop + versus;
  var values = [coop, versus];
  var chart = document.getElementById("coopChart");
  var coopChart = new Chart(chart, {
    type: 'doughnut',
    data: {
      labels: ["Coop", "Versus"],
      datasets: [{
        label: '# of Games',
        backgroundColor: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 3, 1)'],
        lineTension: 0,
        data: values,
        borderColor: 'rgba(51, 57, 255, 1)',
        borderWidth: 3,
        borderJoinStyle: 'round',
      }]
    },
    options: {
      tooltips: {
        callbacks: {
          label: function(tooltipItem, chartData) {
            var value = values[tooltipItem.index]
            var label = chartData.labels[tooltipItem.index]
            var valuePct = value / total
            return `${label}: ${value} (${formatPct(valuePct)})`

          }
        }
      }
    }
  });
}

function formatPct(value) {
  return (value * 100).toFixed(1) + '%';
}

function calculateCoop(feedData) {
  var coop = {}
  coop.coop = feedData.filter(item => item.coOp === 'Yes').length
  coop.versus = feedData.filter(item => item.coOp === 'No').length
  console.log('[Pie Chart] Coop', feedData.filter(item => item.coOp !== 'Yes' && item.coOp !== 'No'))
  return coop;
}

function provideTotal(feedData) {
  var total = feedData.length
  return total;
}

function calculatePandemic(feedData) {
  var pandemic = {}
  pandemic.wins = feedData.filter(item => item.name === "Pandemic" && item.coOpOutcome === "Won").length
  pandemic.losses = feedData.filter(item => item.name === "Pandemic" && item.coOpOutcome === "Lost").length
  return pandemic;
}
