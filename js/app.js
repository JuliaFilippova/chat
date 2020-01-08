// отправка сообщения в чат
const sendMessageFunction = () => {
        //Функция которая берет текст из поля ввода
        let message = $('textarea').val();

        //Формирует сообщение
        $('#chatbox ul').append(
        getNewMessageHtml()
        );

        //очищает полеввода после отправки
        $ ('#textarea').val('');
    };
    
    // после ввода текста отправляем клавишей enter
    $("#textarea").keyup(e => {
        //Проверка что нажали enter
        if(e.key === 'Enter') sendMessageFunction()
    });
    // отправка сообщения по кнопке btn-send
    $("#btn-send").click(sendMessageFunction);

const getNewMessageHtml = () => {
    //Функция которая берет текст из поля ввода
    let message = $('textarea').val();

    // использования document.createElement
	const liItem       = document.createElement('li'),
	      divMessage   = document.createElement('div'),
	      spanTime     = document.createElement('span'),
	      divAvatarBox = document.createElement('div'),
	      imgAvatar    = document.createElement('img');
	// Теперь каждому надо дать свой класс и засунуть друг в друга ( изнутри наружу )

	// Через setAttribute ставим картинке ссылку. Так можно установить любой аттрибут
	imgAvatar.setAttribute('src', 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg');

	// Класс для дива в котором лежит картинка
	divAvatarBox.classList.add('msg-box__avatar');

	// Кладем картинку внутрь дива
	divAvatarBox.appendChild(imgAvatar);

	// Класс для span
	spanTime.classList.add('msg_time');
	spanTime.innerText = '04:20';

	// Класс для div в котором лежит span и div c картинкой
	divMessage.classList.add('message');
	// Кладем span и div с картинкой в .message
	divMessage.innerText = message;
	divMessage.appendChild(spanTime);
	divMessage.appendChild(divAvatarBox);

	// Класс для li
	liItem.classList.add('items');
	// Кладем .message в li
	liItem.appendChild(divMessage);

	return liItem;
}



    