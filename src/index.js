module.exports = function solveSudoku(matrix) {
  // your solution
  let suggestedNumbers = [];
  let secRow = 0;
  let secColumn = 0;

  function recalcPredict(sudo) {
    for(let i = 0; i < sudo.length; i++) {
      for(let j = 0; j < sudo[i].length; j++) {
        // Проверяем задано ли уже в ячейке число
        if( !!sudo[i][j] == true && sudo[i][j].length == undefined){
          continue;
        }

        if(!!sudo[i][j] == true && sudo[i][j].length != undefined){
          // Значит в ячеке массив с подходящими значениями
          // Определяем допустимые значения
          // Чтобы снова их проверить
          suggestedNumbers = sudo[i][j];
          // Строка
          for(let r = 0; r < sudo[i].length; r++) {
            if( !!sudo[i][r] == true && sudo[i][r].length == undefined 
              && !!(~suggestedNumbers.indexOf(sudo[i][r])) ) {
              suggestedNumbers.splice(suggestedNumbers.indexOf(sudo[i][r]), 1);
            }
          }
          // Столбец
          for(let c = 0; c < sudo.length; c++){
            if (!!sudo[c][j] == true && sudo[c][j].length == undefined
              && !!(~suggestedNumbers.indexOf(sudo[c][j])) ) {
              suggestedNumbers.splice(suggestedNumbers.indexOf(sudo[c][j]), 1);
            }
          }
          // Секция
          secRow = Math.floor(i / 3) * 3;
          secColumn = Math.floor(j / 3) * 3;
          for(let sr = secRow; sr < 3; sr++){
            for(let sc = secColumn; sc < 3; sc++) {
              if  (!!sudo[sr][sc] == true && sudo[sr][sc].length == undefined
                && !!(~suggestedNumbers.indexOf(sudo[sr][sc])) ) {
                  suggestedNumbers.splice(suggestedNumbers.indexOf(sudo[sr][sc]), 1);
                }
            }
          }
          // Анализ значений
          if (suggestedNumbers.length == 1) {
            sudo[i][j] = suggestedNumbers[0];
            continue;
          } else if(suggestedNumbers.length > 1) {
              sudo[i][j] = suggestedNumbers;
              continue;
            } else if (suggestedNumbers.length == 0) {
                console.log('Нет возможных значений');
                return false;
            }
        }

        // Проверяем строку/столбец/блок на возможные значения
        if(!!sudo[i][j] == false && sudo[i][j].length == undefined){
          // Задаю возможные значения, а потом их вырезаю
          suggestedNumbers = [1,2,3,4,5,6,7,8,9];
          // Итерация строки + вырезание найденного значения 
          // из возможных для данной ячейки
          for(let r = 0; r < sudo[i].length; r++) {
            if( !!sudo[i][r] == true && sudo[i][r].length == undefined 
              && !!(~suggestedNumbers.indexOf(sudo[i][r])) ) {
              suggestedNumbers.splice(suggestedNumbers.indexOf(sudo[i][r]), 1);
            }
          }
          // Итерация столбца + вырезание найденного значения 
          // из возможных для данной ячейки
          for(let c = 0; c < sudo.length; c++){
            if (!!sudo[c][j] == true && sudo[c][j].length == undefined
              && !!(~suggestedNumbers.indexOf(sudo[c][j])) ) {
              suggestedNumbers.splice(suggestedNumbers.indexOf(sudo[c][j]), 1);
            }
          }
          // Указываю значение верхней левой ячейки секции
          // в которой находится исследуемая ячейка
          secRow = Math.floor(i / 3) * 3;
          secColumn = Math.floor(j / 3) * 3;
          // Перебираю секцию в которой 
          // находится исследуемая ячейка
          for(let sr = secRow; sr < 3; sr++){
            for(let sc = secColumn; sc < 3; sc++) {
              if  (!!sudo[sr][sc] == true && sudo[sr][sc].length == undefined
                && !!(~suggestedNumbers.indexOf(sudo[sr][sc])) ) {
                  suggestedNumbers.splice(suggestedNumbers.indexOf(sudo[sr][sc]), 1);
                }
            }
          }
          //Анализируем подходящие числа  
          if (suggestedNumbers.length == 1) {
            // Нашли одно единcтвенное возможное
            // число и приравняли с 
            // исследуемой ячейкой 
            sudo[i][j] = suggestedNumbers[0];
            continue;
          } else if(suggestedNumbers.length > 1) {
            //Если возможных чисел больше одного,
            // то добавляем массив допустимых числе в ячейку
              sudo[i][j] = suggestedNumbers;
              continue;
            } else if (suggestedNumbers.length == 0) {
              // Нет возможных значений
                console.log('Нет возможных значений');
                return false;
              }
        }

      }
    }
    return sudo;
  }
  return recalcPredict(recalcPredict(recalcPredict(matrix)));
}
