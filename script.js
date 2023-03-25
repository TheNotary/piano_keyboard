let keys = document.querySelectorAll(".white-key, .black-key");

let scaleModes = {
  "ionian": ["C", "D", "E", "F", "G", "A", "B"],
  "dorian": ["C", "D", "D#", "F", "G", "A", "A#"],
  "phrygian": ["C", "C#", "D#", "F", "G", "G#", "A#"],
  "lydian": ["C", "D", "E", "F#", "G", "A", "B"],
  "mixolydian": ["C", "D", "E", "F", "G", "A", "A#"],
  "aeolian": ["C", "D", "D#", "F", "G", "G#", "A#"],
  "locrian": ["C", "C#", "D#", "F", "F#", "G#", "A#"]
};
makeModesHtmlFriendly(scaleModes);

let modeNameDiv = document.getElementById("scale-name");

keys.forEach(key => {
  key.addEventListener('click', () => {
    key.classList.toggle('selected');
    updateMode();
  });
});


function updateMode() {
  let selectedMode = null;
  let potentialModes = [];
  let selectedKeys = document.querySelectorAll(".selected");
  let selectedNotes = [];

  selectedKeys.forEach(key => {
    let note = key.getAttribute("id");
    selectedNotes.push(note);
  });

  for (let mode in scaleModes) {
    let modeNotes = scaleModes[mode];
    let isMode = true;

    for (let i = 0; i < selectedNotes.length; i++) {
      if (!modeNotes.includes(selectedNotes[i])) {
        isMode = false;
        break;
      }
    }

    if (isMode) {
      selectedMode = mode;
      break;
    }
  }

  if (selectedMode) {
    modeNameDiv.innerHTML = selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1);
  } else {
    modeNameDiv.innerHTML = "";
  }
}

function makeModesHtmlFriendly(scaleModes) {
  for (const [modeName, modeNotes] of Object.entries(scaleModes)) {
    for (let j = 0; j < modeNotes.length; j++) {
      let note = modeNotes[j];

      modeNotes[j] = note.replace('#', '-sharp');
    }
  }
}
