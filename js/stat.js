'use strict';

var cloudParams = {
  WIDTH: 420, // ширина облака
  HEIGHT: 270, // высота облака
  X: 100, // начало координат по оси Х
  Y: 10 // начало координат по оси Y
};

var barParams = {
  WIDTH: 40, // ширина колонки
  HEIGHT: 150, // максимальная высота гистограммы
  BETWEEN: 50, // расстояние между колонками
  X: 155, // начало координат отрисовки колонки/текста по оси Х
  Y: 250 // начало координат отрисовки колонки/текста по оси Y
};

var textParams = {
  ROW_X: 130, // положение текста по оси Х
  ROW_Y: 40, // положение текста по оси Y, первая строка
  LINE_HEIGHT: 20,
  GAP: 16, // размер шрифта
  FONT: '16px PT Mono',
  COLOR_BLACK: '#000',
  COLOR_WHITE: '#fff',
  SHADOW: 'rgba(0, 0, 0, 0.7)',
  TEXT: 'Ура, вы победили!\nСписок результатов:',
  MAX_WIDTH: 180
};

var GAP = 10; // на сколько смещается блок

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, cloudParams.X + GAP, cloudParams.Y + GAP, textParams.SHADOW);
  renderCloud(ctx, cloudParams.X, cloudParams.Y, textParams.COLOR_WHITE);

  ctx.font = textParams.FONT;
  ctx.fillStyle = textParams.COLOR_BLACK;

  wrapText(ctx, textParams.TEXT, textParams.ROW_X, textParams.ROW_Y, textParams.MAX_WIDTH, textParams.LINE_HEIGHT);

  var maxTime = getMaxElement(times);

  // отрисовываю имена, очки и гистораммы
  for (var i = 0; i < names.length; i++) {
    renderText(ctx, names[i], barParams.X + (barParams.WIDTH + barParams.BETWEEN) * i, barParams.Y + textParams.GAP, textParams.COLOR_BLACK);
    renderText(ctx, Math.round(times[i]), barParams.X + (barParams.WIDTH + barParams.BETWEEN) * i, cloudParams.HEIGHT - (barParams.HEIGHT * times[i] / maxTime) - GAP * 3, textParams.COLOR_BLACK);

    ctx.fillStyle = randomColor(names[i]);
    ctx.fillRect(barParams.X + (barParams.WIDTH + barParams.BETWEEN) * i, barParams.Y, barParams.WIDTH, (-barParams.HEIGHT * times[i] / maxTime));
  }
};

/**
 * функция для отрисовки поля победного экрана
 * @param {Object} ctx - canvas
 * @param {number} x - координаты по оси Х
 * @param {number} y - координаты по оси Y
 * @param {string} color - цвет
 */
function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudParams.WIDTH, cloudParams.HEIGHT);
}

/**
 * функция для поиска максимального числа в массиве
 * @param {array} arr - итерируемый массив
 * @return {number}
 */
function getMaxElement(arr) {
  return Math.max.apply(null, arr);
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
 * @param {Object} ctx - canvas
 * @param {string} text - количество очков, имена игроков, заголовок
 * @param {number} x - координаты по оси Х
 * @param {number} y - координаты по оси Y
 * @param {string} color - цвет текста
 */
function renderText(ctx, text, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

/**
 *задаю цвета гистограмме
 * @param {array} names
 * @return {string}
 */
function randomColor(names) {
  var colorRed = 'rgba(255, 0, 0, 1)';
  var randomBlue = 'hsl(240,' + (getRandomInt(1, 100)) + '%' + ', 50%)';

  return names === 'Вы' ? colorRed : randomBlue;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  var words = text.split('\n');
  var line = '';

  for (var i = 0; i < words.length; i++) {
    var testLine = line + words[i] + ' ';
    var testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth) {
      ctx.fillText(line, x, y);
      line = words[i] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, x, y);
}
