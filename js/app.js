// отправка сообщения в чат
const sendMessageFunction = (file = null) => {
    if (messageIsEmpty() && file === null) return;

    //Формирует сообщение
    $('#chatbox ul').append(
        getNewMessageHtml(file)
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


// Эта страшная функция делает base64 для вставки картинок.
// Т.к. в img в src вставляется ссылка, иначе картинку никак не отобразить
// Но файлы еще можно хранить в закодированном виде
// и через такую штуку отобразить картинку в разметке нигде на сервере ее не сохраняя
// Тут еще есть страшная штука - callback. в функцию можно передать как параметр другую функцию
// и вызвать ее когда надо
const getImageSrcFromFile = (file, callback) => {
    const fileReader = new FileReader;

    fileReader.onload = ({ target }) => {
        // Передаем обратно полученный код изображения
        callback(target.result);
    };

    fileReader.readAsDataURL(file);
};

const getNewMessageHtml = (file = null) => {
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

    if (file instanceof File) {
        // Если это картинка, то вызываем функцию создание src для картинки и вставляем картинку
        if (isImage(file)) {
            // Создаем элемент картинки
            const image = document.createElement('img');

            getImageSrcFromFile(file, imgCode => {
                image.setAttribute('src', imgCode);
                image.setAttribute('width', '300');
            });

            // Кладем созданную картинку в див сообщения ( наверное надо отдельно это норм сверстать )
            divMessage.appendChild(image);
        } else {
            // Если не картинка то вставляем имя и размер файла

            // Размер файла хранится в байтах. Переводим в мегабайты и округляем до 2х символов после запятой
            const fileSize = Number(file.size / (1024 * 1024)).toFixed(2);

            divMessage.innerText = `Файл - ${file.name}. Размер файла - ${fileSize}mb`;
        }
    } else {
        // Кладем текст в див
        divMessage.innerText = message;
    }


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
    const message = $('textarea').val();

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
const getRandomAvatarUrl = () => {
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


// Проверка что выбранный файл это картинка
const isImage = file => {
    const imageMimeTypes = ['image/gif', 'image/jpeg', 'image/png'];

    // Проверяем что тип файла есть в массиве
    return imageMimeTypes.includes(file.type);
};

// Вызывается после выбора файла, навесили эту функцию в emitFileInputClick
const inputChangeHandler = e => {
    // "e" - это Событие, в нем хранится много инфы. Но нас интересуют только файлы
    // Если файл не выбрали прекратить выполнение кода
    if (e.target.files.length === 0) return;

    // Берем выбранный файл
    const file = e.target.files[0];

    // Вызываем функцию отправки смс
    // Она же вызывается при клике на иконку отправки и на нажатие ентера
    // Только тут мы передаем в нее файл
    sendMessageFunction(file)
}

// Вызывается после клика на иконку
const emitFileInputClick = () => {
    // тут нам надо эмитировать клик по инпуту для выбора файла:
    // 1) Создать фейковый input type=file
    // 2) Повесить на него функцию, которая вызовется после выбора файла ( selectFileHandler)
    // 3) Сделать фейковый клик по нем, будто мы кликнули по реальному инпуту

    // создали фейковый input
    const input = document.createElement('input');
    // Задать инпуту 'type' =  'file'. Через setAttribute ( как ссылку аватарке )
    input.setAttribute('type', 'file');

    //Это навешивает функцию, которая вызовется после выбора файла
    input.onchange = inputChangeHandler;

    // Ну и тут программно кликаем по фейковому инпуту, вышесозданному
    input.click();
}
// клик по иконке прикрепления файлов
$(".iconFile").click(emitFileInputClick);