
/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * 创建一个包含所有卡片的数组
 */
let cards = document.getElementsByClassName('card');

 /*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "match" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */

let open = [];

let movesCount = 0;

function openCardFunction(card) {
	card.classList.add('show', 'open');
}

function addOpenArrayFunction(card) {
	open.push(card);
}


function matchCardFunction() {
	open[open.length-1].classList.add('match');
	open[open.length-2].classList.add('match');
	addMovesCountFunction();
	if (open.length == 2) {
		successFunction();
	}
}

function notMatchCardFunction() {
	open.pop().classList.remove('show', 'open');
	open.pop().classList.remove('show', 'open');
	addMovesCountFunction();
}

function addMovesCountFunction() {
	movesCount++;
	const span = document.querySelector('#moves');
	span.textContent = movesCount;
}

function successFunction() {
	// 移除页面内容

	// 添加页面内容
	
}

/*
* 星级评分
* 总移动数小于等于10次为三颗星
* 总移动数大于10次、小于等于14次为两颗星
* 总移动数大于14次为一颗星
*/
let stars = document.getElementsByClassName('stars')[0].children;

function starRatingFunction() {
	if (movesCount <= 10) {
		// no set
	} else if (movesCount <= 14) {
		stars[stars.length-1].classList.replace('fa-star', 'fa-star-o');
	} else {
		stars[stars.length-1].classList.replace('fa-star', 'fa-star-o');
		stars[stars.length-2].classList.replace('fa-star', 'fa-star-o');
	}
}

for (let i = 0; i < cards.length; i++) {
	cards[i].addEventListener('click', function() {
		// 显示卡片的符号
		if (!cards[i].classList.contains('show')) {
			// 显示卡片的符号
			openCardFunction(cards[i]);
			// 将卡片添加到状态为 “open” 的 *数组* 中
			addOpenArrayFunction(cards[i]);
			// 如果数组中已有另一张卡，请检查两张卡片是否匹配
			if (open.length % 2 == 0) {
				let last1 = open[open.length-1].firstElementChild.classList;
				let last2 = open[open.length-2].firstElementChild.classList;
				if ( last1.toString() == last2.toString()) {
					// 将卡片锁定为 "match" 状态
					matchCardFunction();
				} else {
					// 将卡片从数组中移除并隐藏卡片的符号
					notMatchCardFunction();
				}
				starRatingFunction();
			}
		}
	});
}


let restart = document.getElementsByClassName('restart')[0];

restart.addEventListener('click', function() {
	// 重启按钮使玩家能够重置游戏板、计时器和星级评分
	// 卡片状态重置
	for(let i = 0; i < cards.length; i++) {
		cards[i].classList.remove('show', 'open', 'match');
	}
	// 存储打开状态的数组 open 重置
	open.length = 0;
	// 星级评分重置
	for (let i = 0; i < stars.length; i++) {
		stars[i].classList.replace('fa-star-o', 'fa-star');
	}
	// 总移动次数重置
	const span = document.querySelector('#moves');
	movesCount = 0;
	span.textContent = movesCount;

	// 随机洗牌
	setCardShuffleFunction();
});

/* Memory Game 逻辑
* 该游戏会随机洗牌。所有牌都匹配后，用户就获胜了。
* 主要是将类属性数组打乱重新分配给 card 
*/
let farTypes = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 
'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 
'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];

setCardShuffleFunction();

function setCardShuffleFunction() {
	// 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
	farTypes = shuffle(farTypes);
	// 循环遍历每张卡片
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].children.length != 0) {
			// 先移除子元素
			cards[i].removeChild(cards[i].firstElementChild);
		}
		// 创建其 HTML
		let htmlCard = '<i class="' + farTypes[i] + '"></i>';
		// 将每张卡的 HTML 添加到页面
		cards[i].insertAdjacentHTML('afterbegin', htmlCard);;
	}
}

