'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  var maxTime = getMaxElement(times);
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + 4 * GAP, CLOUD_Y + 3 * GAP);
  ctx.fillText('Список результатов:', CLOUD_X + 4 * GAP, CLOUD_Y + 3.5 * GAP + FONT_GAP);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + 4 * GAP + (4 * GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - 2 * GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + 4 * GAP + (4 * GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - 3 * GAP - FONT_GAP - (MAX_BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = 'hsl(240, ' + Math.random() * 100 + '%, ' + Math.random() * 100 + '%)';
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(CLOUD_X + 4 * GAP + (4 * GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - 2 * GAP - FONT_GAP - (MAX_BAR_HEIGHT * times[i]) / maxTime, BAR_WIDTH, (MAX_BAR_HEIGHT * times[i]) / maxTime);
  }
};
