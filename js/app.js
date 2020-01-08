// отправка сообщения в чат
const sendMessageFunction = () => {
        //Функция которая берет текст из поля ввода
        let message = $('textarea').val();

        //Формирует сообщение
        let messageHtml = '<div class="message">' + message + '</div>';

        //Вставляет в место где они выводятся
        $('#chatbox').append(messageHtml);

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


    