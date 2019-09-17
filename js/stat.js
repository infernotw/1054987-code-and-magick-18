'use strict';

var
  CLOUD_WIDTH = 420; // ширина облака
var CLOUD_HEIGHT = 270; // высота облака
var CLOUD_X = 100; // начало координат по оси Х
var CLOUD_Y = 10; // начало координат по оси Y
var GAP = 10; // на сколько смещается блок
var FONT_GAP = 16; // размер шрифта
var TEXT_ROW_X = 130; // положение текста по оси Х
var TEXT_ROW_Y_FIRST = 40; // положение текста по оси Y, первая строка
var TEXT_ROW_Y_SECOND = 60; // положение текста по оси Y, вторая строка
var BAR_X = 155; // начало координат отрисовки колонки/текста по оси Х
var BAR_Y = 250; // начало координат отрисовки колонки/текста по оси Y
var BAR_WIDTH = 40; // ширина колонки
var BAR_HEIGHT = 150; // максимальная высота гистограммы
var BAR_BETWEEN = 50; // расстояние между колонками
var COLOR_BLACK = '#000';
var TEXT_FONT = '16px PT Mono';

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = TEXT_FONT;
  renderText(ctx, 'Ура, вы победили!', TEXT_ROW_X, TEXT_ROW_Y_FIRST, COLOR_BLACK);
  renderText(ctx, 'Список результатов:', TEXT_ROW_X, TEXT_ROW_Y_SECOND, COLOR_BLACK);

  var maxTime = getMaxElement(times);

  // отрисовываю имена, очки и гистораммы
  for (var i = 0; i < names.length; i++) {
    renderText(ctx, names[i], BAR_X + (BAR_WIDTH + BAR_BETWEEN) * i, BAR_Y + FONT_GAP, COLOR_BLACK);
    renderText(ctx, Math.round(times[i]), BAR_X + (BAR_WIDTH + BAR_BETWEEN) * i, CLOUD_HEIGHT - (BAR_HEIGHT * times[i] / maxTime) - GAP * 3, COLOR_BLACK);

    // задаю отдельный цвет столбику с названием 'Вы'
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240,' + (getRandomInt(1, 100)) + '%' + ', 50%)';
    }

    ctx.fillRect(BAR_X + (BAR_WIDTH + BAR_BETWEEN) * i, BAR_Y, BAR_WIDTH, (-BAR_HEIGHT * times[i] / maxTime));
  }
};

/**
 * функция для отрисовки поля победного экрана
 * @param {object} ctx - canvas
 * @param {number} x - координаты по оси Х
 * @param {number} y - координаты по оси Y
 * @param {string} color - цвет
 */
function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

/**
 * функция для поиска максимального числа в массиве
 * @param {array} arr - итерируемый массив
 * @return {number}
 */
function getMaxElement(arr) {

  // выхожу из функции, если массив пустой
  if (!arr.length) {
    return false;
  }

  var maxElement = arr[0];

  // нахожу максимальный элемент в массиве
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

/**
 * функция для создания случайного числа
 * @param {number} min - минимальное значение
 * @param {number} max - максимальное значение
 * @return {number}
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * функция для отрисовки текста
 * @param {object} ctx - canvas
 * @param {string} text - количество очков, имена игроков, заголовок
 * @param {number} x - координаты по оси Х
 * @param {number} y - координаты по оси Y
 * @param {string} color - цвет текста
 */
function renderText(ctx, text, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}
