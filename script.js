function sleep(ms){
return new Promise(resolve => setTimeout(resolve, ms));
}

/* ================= DOWNLOAD ================= */
async function downloadPDF(){

if(window.location.pathname.includes("index")){
alert("Go to protocol pages to download notes");
return;
}

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

let y = 10;

function addTitle(text){
doc.setFontSize(16);
doc.text(text,10,y);
y+=8;
}

function addBody(text){
doc.setFontSize(11);
const lines = doc.splitTextToSize(text,180);
doc.text(lines,10,y);
y += lines.length * 6;


if(y > 270){
  doc.addPage();
  y = 10;
}


}

// ===== POLLING =====
if(window.location.pathname.includes("polling")){


addTitle("Polling Protocol");

addBody("Definition: Polling is a controlled access protocol where a master node sequentially checks each node for data transmission.");

addBody("Relevance: It is used in MAC layer and ensures collision-free communication.");

addBody("Working: The master node sends request signals one by one. Each node responds if it has data.");

addBody("Real Life: Teacher calling roll numbers one by one.");

addBody("Example: If there are 4 nodes and each takes 2 ms, total delay = 8 ms.");

addBody("Advantages: No collision, simple to implement, predictable.");

addBody("Disadvantages: High delay, inefficient when nodes are idle.");

addBody("Comparison: Better than random access in collision avoidance but worse in delay.");


}

// ===== VOTING =====
if(window.location.pathname.includes("voting")){


addTitle("Voting Protocol");

addBody("Definition: Voting protocol is used in distributed systems to maintain consistency using quorum.");

addBody("Relevance: Used in distributed databases and replication control.");

addBody("Working: Each node votes. If votes reach quorum, operation is allowed.");

addBody("Real Life: Election voting system.");

addBody("Example: 5 nodes with quorum 3 ensures consistency.");

addBody("Advantages: Fault tolerance, consistency.");

addBody("Disadvantages: Overhead, complexity.");

addBody("Important Rule: Quorum must be greater than half to avoid conflicts.");


}

// ===== RESERVATION =====
if(window.location.pathname.includes("reservation")){


addTitle("Reservation Protocol");

addBody("Definition: Reservation protocol allows nodes to reserve slots before transmission.");

addBody("Relevance: Controlled access protocol in MAC layer.");

addBody("Working: Time is divided into frames. Each node reserves a slot.");

addBody("Real Life: Train reservation system.");

addBody("Example: If 2 out of 4 slots are used, efficiency = 50%.");

addBody("Advantages: No collision, efficient scheduling.");

addBody("Disadvantages: Idle slots waste bandwidth.");

addBody("Comparison: More efficient than polling when traffic is predictable.");


}

// ===== EXTRA PAGE =====
addTitle("Comparison of Protocols");

addBody("Polling: Centralized, high delay, simple.");

addBody("Voting: Decentralized, ensures consistency.");

addBody("Reservation: Pre-planned transmission, efficient.");

doc.save("CN_Notes_Advanced.pdf");
}

  // ===== POLLING =====
  if(window.location.pathname.includes("polling")){

    addTitle("Polling Protocol");

    addBody("Polling is a controlled access mechanism where a master node checks each node sequentially.");

    addBody("Working: Master asks each node. If data exists → transmit.");

    addBody("Example: 4 nodes × 2 ms = 8 ms delay.");

    addBody("Advantages: No collision. Simple.");

    addBody("Disadvantages: High delay, idle polling.");
addBody("Numerical Nature: Polling is mostly conceptual. Basic formula: Delay = n × t. No complex derivations.");
  }

  // ===== VOTING =====
  if(window.location.pathname.includes("voting")){

    addTitle("Voting Protocol");

    addBody("Voting protocol ensures consistency using quorum.");

    addBody("Working: Nodes vote. If votes ≥ quorum → allowed.");

    addBody("Example: 5 nodes, quorum = 3.");

    addBody("Advantages: Fault tolerant.");

    addBody("Disadvantages: Overhead.");
addBody("Numerical Nature: Voting is logical. Based on quorum rule q > n/2. No heavy calculations.");
  }

  // ===== RESERVATION =====
  if(window.location.pathname.includes("reservation")){

    addTitle("Reservation Protocol");

    addBody("Stations reserve slots before transmission.");

    addBody("Working: Time divided into frames.");

    addBody("Example: 2/4 slots = 50% efficiency.");

    addBody("Advantages: No collision.");

    addBody("Disadvantages: Idle slots waste bandwidth.");
addBody("Numerical Nature: Reservation involves simple ratio calculation. Efficiency = used / total.");
  }

  doc.save("CN_Notes.pdf");

/* ================= MODALS ================= */
function openHelp(){
document.getElementById("helpModal").style.display="flex";
}
function closeHelp(){
document.getElementById("helpModal").style.display="none";
}

function openDev(){
document.getElementById("devModal").style.display="flex";
}
function closeDev(){
document.getElementById("devModal").style.display="none";
}

/* ================= POLLING ================= */
async function startPolling(){

  const log = document.getElementById("logBox");
  const packet = document.getElementById("packet");

  log.innerHTML = "";

  for(let i=1;i<=4;i++){

    const node = document.getElementById("n"+i);
    const rect = node.getBoundingClientRect();
    const parent = document.getElementById("simArea").getBoundingClientRect();

    // Move packet
    packet.style.left = (rect.left - parent.left + 20) + "px";
    packet.style.top = "40px";

    node.classList.add("active");

    log.innerHTML += `<p>Polling Node ${i}</p>`;
    log.scrollTop = log.scrollHeight;

    await sleep(700);

    log.innerHTML += `<p>Node ${i} transmitted</p>`;
    log.scrollTop = log.scrollHeight;

    node.classList.remove("active");
  }
}

function resetPolling(){

document.getElementById("logBox").innerHTML = "";

for(let i=1;i<=4;i++){
document.getElementById("n"+i).classList.remove("active");
}
}

/* ================= VOTING ================= */
async function startVoting(){

  const log = document.getElementById("vlog");
  const packet = document.getElementById("vpacket");

  log.innerHTML = "";

  let votes = 0;

  for(let i=1;i<=5;i++){

    const node = document.getElementById("v"+i);

    const rect = node.getBoundingClientRect();
    const parent = document.getElementById("vSim").getBoundingClientRect();

    // Move packet
    packet.style.left = (rect.left - parent.left + 20) + "px";
    packet.style.top = "40px";

    node.classList.add("active");

    votes++;
    log.innerHTML += `<p>Node ${i} voted YES</p>`;
    log.scrollTop = log.scrollHeight;

    await sleep(600);

    if(votes >= 3){
      log.innerHTML += `<p><b>Quorum Achieved ✔</b></p>`;
      break;
    }
  }
}

function resetVoting(){
  document.getElementById("vlog").innerHTML="";

  for(let i=1;i<=5;i++){
    document.getElementById("v"+i).classList.remove("active");
  }
}


/* ================= RESERVATION ================= */
async function startRes(){

  const log = document.getElementById("rlog");
  const packet = document.getElementById("rpacket");

  log.innerHTML = "";

  let used = 0;

  for(let i=1;i<=4;i++){

    const slot = document.getElementById("r"+i);

    const rect = slot.getBoundingClientRect();
    const parent = document.getElementById("rSim").getBoundingClientRect();

    // Move packet
    packet.style.left = (rect.left - parent.left + 20) + "px";
    packet.style.top = "40px";

    slot.classList.add("reserved");

    log.innerHTML += `<p>Slot ${i} reserved</p>`;
    log.scrollTop = log.scrollHeight;

    used++;

    await sleep(500);

    slot.classList.add("transmitting");

    log.innerHTML += `<p>Slot ${i} transmitting</p>`;
    log.scrollTop = log.scrollHeight;

    await sleep(500);
  }

  log.innerHTML += `<p><b>Efficiency = ${(used/4)*100}%</b></p>`;
}

function resetRes(){

  document.getElementById("rlog").innerHTML="";

  for(let i=1;i<=4;i++){
    const s = document.getElementById("r"+i);
    s.classList.remove("reserved");
    s.classList.remove("transmitting");
  }
}



/* ================= NUMERICAL ================= */

function calcPolling(){

const n = parseInt(document.getElementById("nodes").value);
const t = parseInt(document.getElementById("time").value);

if(isNaN(n) || isNaN(t)){
document.getElementById("pollResult").innerHTML =
"⚠️ Enter valid numbers";
return;
}

const result = n * t;

document.getElementById("pollResult").innerHTML =
`<b>Delay = ${result} ms</b><br>
     Meaning: Time taken for one full polling cycle`;
}

function calcVoting(){

const total = parseInt(document.getElementById("totalNodes").value);
const quorum = parseInt(document.getElementById("quorum").value);

if(isNaN(total) || isNaN(quorum)){
document.getElementById("voteResult").innerHTML =
"⚠️ Enter valid numbers";
return;
}

document.getElementById("voteResult").innerHTML =
(quorum > total/2)
? "✔ Valid Quorum → System Safe"
: "❌ Invalid Quorum → Risk of inconsistency";
}

function calcRes(){

const used = parseInt(document.getElementById("usedSlots").value);
const total = parseInt(document.getElementById("totalSlots").value);

if(isNaN(used) || isNaN(total) || total === 0){
document.getElementById("resResult").innerHTML =
"⚠️ Enter valid numbers";
return;
}

const eff = (used/total)*100;

document.getElementById("resResult").innerHTML =
`<b>Efficiency = ${eff.toFixed(2)}%</b><br>
     Meaning: Percentage of slots effectively used`;
}
