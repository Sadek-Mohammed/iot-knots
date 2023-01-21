const firebaseConfig = {

    apiKey: "AIzaSyDZjkV7KorzypKoBL47K9HSUt6dInE_CNM",

    authDomain: "cap333-2a617.firebaseapp.com",

    databaseURL: "https://cap333-2a617-default-rtdb.firebaseio.com",

    projectId: "cap333-2a617",

    storageBucket: "cap333-2a617.appspot.com",

    messagingSenderId: "165303997024",

    appId: "1:165303997024:web:790879ff6b789df6cc2905",

    measurementId: "G-T6CTFP626G"

};

const tbody = document.querySelector(".tbody")
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let timer = [];
let ph = {
    reading: [],
    mean: [],
    min: [],
    max: [],
    median: [],
    dev: []
};

let level = {
    reading: [],
    mean: [],
    min: [],
    max: [],
    median: [],
    dev: []
};

let temp = {
    reading: [],
    mean: [],
    min: [],
    max: [],
    median: [],
    dev: []
};

let air = {
    reading: [],
    mean: [],
    min: [],
    max: [],
    median: [],
    dev: []
};

const register = (newer, ph) => {
    ph.reading.push(newer);
    let lengther = ph.reading.length;
    ph.mean.push(ss.mean(ph.reading));
    ph.median.push(ss.median(ph.reading));
    ph.max.push(ss.max(ph.reading));
    ph.min.push(ss.min(ph.reading));
    ph.dev.push(ss.medianAbsoluteDeviation(ph.reading));
}

// 1 2 3
// 0 1 2
// 0 1
var firebaseRef = firebase.database().ref("now");
firebaseRef.once("value").then((snapshot) => {
    let counter = 0;
    console.log(snapshot.val());
    let newerPh = 0, newerLevel = 0, newerAir = 0, newerTemp = 0;
    snapshot.val().forEach((one) => {
        timer.push(counter);
        newerPh = one.pH, newerLevel = one["water-level"], newerAir = one["air-quality"], newerTemp = one["temperature"];
        register(newerPh, ph)
        register(newerLevel, level)
        register(newerAir, air)
        register(newerTemp, temp)
        counter += 5;
    })
    console.log(ph.reading);
    console.log(ph.min);
    console.log(ph.max);
    console.log(ph.mean);
    console.log(ph.dev);
    console.log(ph.skew);
    console.log(ph.median);
}).then(() => {
    new Chart(document.getElementById(`phGraphMain`), {
        type: 'line',
        data: {
            labels: timer,
            datasets: [{
                label: `Temperature reading`,
                data: temp.reading,
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    new Chart(document.getElementById(`phGraphMin`), {
        type: 'line',
        data: {
            labels: timer,
            datasets: [{
                label: `Temperature Minimum Value`,
                data: temp.min,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    new Chart(document.getElementById(`phGraphMax`), {
        type: 'line',
        data: {
            labels: timer,
            datasets: [{
                label: `Temperature Maximum Value`,
                data: temp.max,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    new Chart(document.getElementById(`phGraphMean`), {
        type: 'line',
        data: {
            labels: timer,
            datasets: [{
                label: `Temperature Average Value`,
                data: temp.mean,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    new Chart(document.getElementById(`phGraphDev`), {
        type: 'line',
        data: {
            labels: timer,
            datasets: [{
                label: `Temperature Media Abdolute Deviation`,
                data: temp.dev,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    new Chart(document.getElementById(`phGraphMedian`), {
        type: 'line',
        data: {
            labels: timer,
            datasets: [{
                label: `Temperature Median Value`,
                data: temp.median,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}).then(() => {
    let skewness = ss.sampleSkewness(temp.reading);
    document.getElementById("skewness").innerText = skewness;
    if (skewness <= 0.5 && skewness >= -0.5) {
        document.getElementById("state").innerText = "Graph is generally symmetric.";
        document.getElementById("conclusions").innerHTML = `                <li>Generally, it is the phase of natural change. However, if preventive measures aren't taken, some
        <strong>real</strong> problems may happen
    </li>
    <li>These measures are mainly about maintaining CO2 emissions at a low level. </li>
    <li>To do so, changes start from decreasing the carboon footprint for each individual.</li>
    <li>Changes extend to the level of whole companies, institutions, and educational buildings.</li>`;
    }
    else if (skewness <= 1 && skewness >= -1) {
        document.getElementById("state").innerText = "Graph is moderately skewed.";
        document.getElementById("conclusions").innerHTML = `                <li>Although situtation isn't that threatening, rapid actions should be taken.</li>
        <li>In addition to decreasing individuals' carboon footprint, the factories' consumption should be
            limited.</li>
        <li>More focus on motivational awards for people who obey the environmental rules is required.</li>
        <li>Discounts on services that save the environment like solar panels, publich transportation, and many
            more.</li>`;
    }
    else {

    }
});