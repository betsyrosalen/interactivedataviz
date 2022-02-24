console.log('hello world');

const label = document.getElementById("number")
const button = document.getElementById("counter")
let count = 0

function countUpdate(){
    count+=1;
    if (count == 1) {
        label.innerText = "Ah hah hah hah!  You have clicked " + count + " time!";
    } else {
        label.innerText = "Ah hah hah hah!  You have clicked " + count + " times!"
    }
    button.innerText = "Count one more?"
}
