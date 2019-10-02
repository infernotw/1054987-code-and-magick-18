'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var WIZARDS_AMOUNT = 4;
var things = [];

var wizardParams = {
    NAME: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES: ['black', 'red', 'blue', 'yellow', 'green']
};

/**
 * получаю случайный номер элемента массива
 * @param {array} arr - массив из которого выбирается случайный элемент
 * @return {string} - полученный элемент массива
 */
function getRandomElement(arr) {
    var arrayElement = Math.floor(Math.random() * arr.length);
    return arr[arrayElement];
}

/**
 * получаю случайную внешность волшебника
 * @return {Object}
 */
function getWizard() {
    return {
        name: getRandomElement(wizardParams.NAME) + ' ' + getRandomElement(wizardParams.SURNAME),
        coatColor: getRandomElement(wizardParams.COAT),
        eyesColor: getRandomElement(wizardParams.EYES)
    };
}

/**
 * создаю массив с случайными волшебниками
 * @param {number} arrayLength - длина массива
 * @return {array}
 */
function getWizards(arrayLength) {
    for (var i = 0; i < arrayLength; i++) {
        things.push(getWizard());
    }

    return things;
}

/**
 * отрисовываю полученного волшебника
 * @param {array} things - массив, в котором хранятся полученные волшебники
 */
function renderWizard(things) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = things.name;
    wizardElement.querySelector('.wizard-coat').style.fill = things.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = things.eyesColor;

    return wizardElement;
}

/**
 *
 * @param {array} things
 */
function renderWizards(things) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < things.length; i++) {
        fragment.appendChild(renderWizard(things[i]));
    }

    return fragment;
}

similarListElement.appendChild(renderWizards(getWizards(WIZARDS_AMOUNT)));

userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');
