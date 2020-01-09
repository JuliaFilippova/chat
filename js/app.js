// отправка сообщения в чат
const sendMessageFunction = () => {
    if (messageIsEmpty()) return;

    //Формирует сообщение
    $('#chatbox ul').append(
        getNewMessageHtml()
    );

    // вызываем функцию очищ поле ввода
    clearMessageInput();
};

// после ввода текста отправляем клавишей enter
$("#textarea").keyup(e => {
    //Проверка что нажали enter
    if (e.key === 'Enter') sendMessageFunction()
});
// отправка сообщения по кнопке btn-send
$("#btn-send").click(sendMessageFunction);

const getNewMessageHtml = () => {
    //Функция которая берет текст из поля ввода
    let message = $('textarea').val();

    // использования document.createElement
    const liItem = document.createElement('li'),
        divMessage = document.createElement('div'),
        spanTime = document.createElement('span'),
        divAvatarBox = document.createElement('div'),
        imgAvatar = document.createElement('img');

    // Теперь каждому надо дать свой класс и положить друг в друга ( изнутри наружу )

    // Через setAttribute ставим картинке функцию(с рандомными ссылками). Так можно установить любой аттрибут
    imgAvatar.setAttribute('src', getRandomAvatarUrl());

    // Класс для дива в котором лежит картинка
    divAvatarBox.classList.add('msg-box__avatar');

    // Кладем картинку внутрь дива
    divAvatarBox.appendChild(imgAvatar);

    // Класс для span
    spanTime.classList.add('msg_time');
    // вызвали функцию (настоящее время час минута секунда)
    spanTime.innerText = getCurrentTime();

    // Класс для div в котором лежит span и div c картинкой
    divMessage.classList.add('message');
    // Кладем текст в див
    divMessage.innerText = message;
    // Кладем span и div с картинкой в .message
    divMessage.appendChild(spanTime);
    divMessage.appendChild(divAvatarBox);

    // Класс для li
    liItem.classList.add('items');
    // Кладем .message в li
    liItem.appendChild(divMessage);

    return liItem;
}

// Длина строки, отправка сообщение от 1 символа
const messageIsEmpty = () => {
    //Возвращает true если пусто или false если есть хоть 1 символ
    let message = $('textarea').val();
    return message.trim().length === 0;
}

//Очищаем тут поле ввода после отправки смс
const clearMessageInput = () => $('#textarea').val('');

const getCurrentTime = () => {
    // создали объект с датой
    const date = new Date();
    // текущее время час минута секунда
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}

// создаем функцию аватарки рандомные картинки
const getRandomValueFromArray = inputArray => {
	// берет случайное значение из переданого массива
	return inputArray[Math.floor(Math.random() * inputArray.length)]
}
// аватарки рандомные картинки
const getRandomAvatarUrl = ( ) => {
	// ссылки на картинки
	const links = [
		'http://emilcarlsson.se/assets/louislitt.png',
		'http://emilcarlsson.se/assets/harveyspecter.png',
		'http://emilcarlsson.se/assets/rachelzane.png',
		'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg',
		'http://profilepicturesdp.com/wp-content/uploads/2018/07/sweet-girl-profile-pictures-9.jpg',
		'https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg'
	];
	return getRandomValueFromArray(links);
}