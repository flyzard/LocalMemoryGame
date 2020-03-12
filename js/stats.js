$(document).ready(function(){
    var email = sessionStorage.getItem('email');
    var statistics = [];
    if (email !== undefined) {
        var user = localStorage.getItem(email);
        if (user !== undefined) {
            stats = JSON.parse(user).stats;
            var table = document.getElementById("last-results-table");
            stats.forEach(element => {
                var row = table.insertRow(1);
                var cell1 = row.insertCell(0);
                cell1.innerHTML = element.time;
                var cell2 = row.insertCell(1);
                cell2.innerHTML = element.game;
                var cell3 = row.insertCell(2);
                cell3.innerHTML = new Date(element.date).toLocaleString();
                addStats(element.game, element.time)
            });
            
            buildStatisticsTable();
        }
    }

    function addStats(game, time) {
        if (statistics[game] == undefined) {
            statistics[game] = [time];
        } else {
            statistics[game].push(time)
        }
    }

    function buildStatisticsTable() {
        var table = document.getElementById("stats-table");
        for (var game in statistics) {
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = game;
            var cell2 = row.insertCell(1);
            cell2.innerHTML = avg(statistics[game]);
            var cell3 = row.insertCell(2);
            cell3.innerHTML = Math.max(...statistics[game]);
            var cell4 = row.insertCell(3);
            cell4.innerHTML = Math.min(...statistics[game]);
        }
    }

    function avg(arr) {
        var total = 0;
        arr.forEach(el => total += el);
        return total / arr.length;
    }

});