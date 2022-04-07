// Constructor function.
function Key(keyIndex, keyName, soundImitation, keyEmojiCode, keySymbol, keySoundSrc) {
  this.keyIndex = keyIndex;
  this.keyName = keyName;
  this.soundImitation = soundImitation;
  this.keyEmojiCode = keyEmojiCode;
  this.keySymbol = keySymbol;
  this.keySoundSrc = keySoundSrc;
  this.createKeyboardKey = function() {
    let newDivElement = document.createElement('button');
    let newSpanElement = document.createElement('span');
    newSpanElement.append(this.keyEmojiCode);
    newSpanElement.setAttribute('class', 'key-emoji');
    newDivElement.appendChild(newSpanElement);
    newDivElement.setAttribute('id', `${this.keyName}-key`);
    newDivElement.setAttribute('class', 'keyboard-key');

    return newDivElement;
  };
  this.createKeyboardShorthand = function() {
    let newDivElement = document.createElement('div');
    let newSpanElement = document.createElement('span');
    let newKbdElement = document.createElement('kbd');
    newSpanElement.append(this.keyEmojiCode);
    newKbdElement.append(this.keySymbol.toUpperCase());
    newDivElement.appendChild(newSpanElement);
    newDivElement.appendChild(newKbdElement);

    return newDivElement;
  };
  this.createAudioElement = function() {
    let newAudioElement = document.createElement('audio');
    newAudioElement.setAttribute('src', this.keySoundSrc);
    newAudioElement.setAttribute('id', `${this.keyName}-sound`);

    return newAudioElement;
  };
};


// EDITABLE - START

// Create new Objects from Constructor function.
const cricketKey = new Key(1, 'cricket', 'chirp, chirp', '\uD83E\uDD97', 'a', 'https://small-projects.s3.eu-west-2.amazonaws.com/animals_sounds_piano/audio/cricket.mp3');
const dogKey = new Key(2, 'dog', 'woof, woof, woof', '\uD83D\uDC36', 's', 'https://small-projects.s3.eu-west-2.amazonaws.com/animals_sounds_piano/audio/dog.mp3');
const catKey = new Key(3, 'cat', 'meow', '\uD83D\uDC31', 'd', 'https://small-projects.s3.eu-west-2.amazonaws.com/animals_sounds_piano/audio/cat.mp3');
const horseKey = new Key(4, 'horse', 'neigh', '\uD83D\uDC34', 'f', 'https://small-projects.s3.eu-west-2.amazonaws.com/animals_sounds_piano/audio/horse.mp3');
const cowKey = new Key(5, 'cow', 'moo', '\uD83D\uDC2E', 'g', 'https://small-projects.s3.eu-west-2.amazonaws.com/animals_sounds_piano/audio/cow.mp3');
const pigKey = new Key(6, 'pig', 'oink, oink, oink', '\uD83D\uDC37', 'h', 'https://small-projects.s3.eu-west-2.amazonaws.com/animals_sounds_piano/audio/pig.mp3');
const chickenKey = new Key(7, 'chicken', 'cock a doodle doo', '\uD83D\uDC14', 'j', 'https://small-projects.s3.eu-west-2.amazonaws.com/animals_sounds_piano/audio/chicken.mp3');
const owlKey = new Key(8, 'owl', 'hoot, hoot', '\uD83E\uDD89', 'k', 'https://small-projects.s3.eu-west-2.amazonaws.com/animals_sounds_piano/audio/owl.mp3');
const bearKey = new Key(9, 'bear', 'roar', '\uD83D\uDC3B', 'l', 'https://small-projects.s3.eu-west-2.amazonaws.com/animals_sounds_piano/audio/bear.mp3');


// Collect all new Objects inside Array.
const keyboardKeysCollection = [cricketKey, dogKey, catKey, horseKey, cowKey, pigKey, chickenKey, owlKey, bearKey];

// EDITABLE -END


// Create Keyboard.
const addKeysToKeyboard = arr => {
  let keysContainer = document.getElementById('keys-container');
  arr.forEach(element => {
    let newKey = element.createKeyboardKey();
    keysContainer.append(newKey);
  });
};

const addShorthands = arr => {
  let shorthandsContainer = document.getElementById('shorthands-container');
  arr.forEach(element => {
    let newShorthand = element.createKeyboardShorthand();
    shorthandsContainer.append(newShorthand);
  });
};

const addAudiosToHtml = arr => {
  let audioContainer = document.getElementById('audio-container');
  arr.forEach(element => {
    let newAudio = element.createAudioElement();
    audioContainer.append(newAudio);
  });
};

addKeysToKeyboard(keyboardKeysCollection);
addShorthands(keyboardKeysCollection);
addAudiosToHtml(keyboardKeysCollection);


// Onomatopoeia.
const addSoundImitation = str => {
  let soundImitationElement = document.getElementById('sound-imitation');

  if (!soundImitationElement) {
    createSoundImitation(str);
  } else {
    soundImitationElement.remove();
    createSoundImitation(str);
  }
};

const createSoundImitation = str => {
  let onomatopoeiaSection = document.getElementById('onomatopoeia-section');
  let newSampElement = document.createElement('samp');
  newSampElement.setAttribute('id', 'sound-imitation');
  newSampElement.innerText = `${str.toUpperCase()}!`;
  onomatopoeiaSection.append(newSampElement);
};


// Add event listeners.
const playWhenClick = arr => {
  arr.forEach(element => {
    let keyId = `${element.keyName}-key`;
    let keyElement = document.getElementById(keyId);
    let audioId = `${element.keyName}-sound`;
    let audioElement = document.getElementById(audioId);

    keyElement.addEventListener('mousedown', function() {
      audioElement.play();
      addSoundImitation(element.soundImitation);
    });
  });
};

const playWhenPress = arr => {
  const keydownHandler = event => {
    let userKeyCode = event.code;

    arr.forEach(element => {
      let keySymbol = element.keySymbol.toUpperCase();
      let audioKeyCode = `Key${keySymbol}`;
      let audioId = `${element.keyName}-sound`;
      let audioElement = document.getElementById(audioId);
      if (userKeyCode === audioKeyCode) {
        audioElement.play();
        addSoundImitation(element.soundImitation);

        let keyElement = document.getElementById(`${element.keyName}-key`);
        keyElement.focus();
      }
    });
  };
  document.addEventListener('keydown', keydownHandler);
}

playWhenClick(keyboardKeysCollection);
playWhenPress(keyboardKeysCollection);