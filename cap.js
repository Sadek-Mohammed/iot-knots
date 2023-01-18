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
firebase.initializeApp(firebaseConfig);
let timer = [];
let ph = {
    reading: [],
    mean: [],
    min: [],
    max: [],
    median: [],
    skew: [],
    dev: []
};

let level = {
    reading: [],
    mean: [],
    min: [],
    max: [],
    median: [],
    skew: [],
    dev: []
};

let temp = {
    reading: [],
    mean: [],
    min: [],
    max: [],
    median: [],
    skew: [],
    dev: []
};

let air = {
    reading: [],
    mean: [],
    min: [],
    max: [],
    median: [],
    skew: [],
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
    if (lengther >= 3) {
        ph.skew.push(ss.sampleSkewness(ph.reading));
    }
    else {
        ph.skew.push(0);
    }
}



var firebaseRef = firebase.database().ref("test");
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
        counter += 2;
    })
}).then(() => {
    new Chart(document.getElementById(`levelGraph`), {
        type: 'line',
        data: {
            labels: timer,
            datasets: [{
                label: `Water Level Reading`,
                data: level.reading,
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
    new Chart(document.getElementById(`airGraph`), {
        type: 'line',
        data: {
            labels: timer,
            datasets: [{
                label: `Air Quality Reading`,
                data: air.reading,
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
    new Chart(document.getElementById(`tempGraph`), {
        type: 'line',
        data: {
            labels: timer,
            datasets: [{
                label: `Temperature Reading`,
                data: temp.reading,
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
    new Chart(document.getElementById(`phGraph`), {
        type: 'line',
        data: {
            labels: timer,
            datasets: [{
                label: `pH reading`,
                data: ph.reading,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },

        }
    });
});