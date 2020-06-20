'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');

var setupPlayer = document.querySelector('.setup-player');
var wizardCoat = setupPlayer.querySelector('.wizard-coat');
var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
var wizardFireballColor = setupPlayer.querySelector('.setup-fireball-wrap');

// setup.classList.remove('hidden');

var similarListElement = setup.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// функция генерация случайного целого числа в диапазоне от min до max включительно
var generateRandomValue = function (min, max) {
  var randomValue = Math.round(Math.random() * (max - min) + min);
  return randomValue;
};
var wizards = [];
var createWizards = function () {
  for (var i = 0; i < 4; i++) {
    var wizard = {
      name: WIZARD_NAMES[generateRandomValue(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[generateRandomValue(0, WIZARD_SURNAMES.length - 1)],
      coatColor: WIZARD_COAT_COLORS[generateRandomValue(0, WIZARD_COAT_COLORS.length - 1)],
      eyesColor: WIZARD_EYES_COLORS[generateRandomValue(0, WIZARD_EYES_COLORS.length - 1)]
    };
    wizards.push(wizard);
  }
  return wizards;
};
createWizards();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && setupUserName !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

// setupOpen.addEventListener('keydown', function (evt) {
//   if (evt.key === 'Enter') {
//     openPopup();
//   }
// });

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

wizardCoat.addEventListener('click', function () {
  var newColorCoat = WIZARD_COAT_COLORS[generateRandomValue(0, WIZARD_COAT_COLORS.length - 1)];
  wizardCoat.style.fill = newColorCoat;
  setupPlayer.querySelector('input[name="coat-color"]').value = newColorCoat;
});


wizardEyes.addEventListener('click', function () {
  var newColorEyes = WIZARD_EYES_COLORS[generateRandomValue(0, WIZARD_EYES_COLORS.length - 1)];
  wizardEyes.style.fill = newColorEyes;
  setupPlayer.querySelector('input[name="eyes-color"]').value = newColorEyes;
});

wizardFireballColor.addEventListener('click', function () {
  var FireballNewColor = WIZARD_FIREBALL_COLORS[generateRandomValue(0, WIZARD_FIREBALL_COLORS.length - 1)];
  wizardFireballColor.style.backgroundColor = FireballNewColor;
  setupPlayer.querySelector('input').value = FireballNewColor;
});

