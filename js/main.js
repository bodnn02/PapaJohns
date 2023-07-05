$("#prev-btn").on("click", function (e) {
    list = $(".form-list").children(".form-list__item")
    length = $(list).length
    current_index = $(".form-list").find(".current").index()

    if(current_index - 1  < 0) {
        $(list).eq(current_index).removeClass("current")
        $(list).eq(length - 1).addClass("current")

        updateProgress() 
    } else {
        $(list).eq(current_index).removeClass("current")
        $(list).eq(current_index - 1).addClass("current")

        updateProgress() 
    }
})
$("#next-btn").on("click", function (e) {
    list = $(".form-list").children(".form-list__item")
    length = $(list).length
    current_index = $(".form-list").find(".current").index()

    if($(".form-list__item.current").find('.selected').length == 0) {
        alert("Вы не выбрали вариант!")
        return false
    }

    if (current_index + 1 == length - 1) {
        $(this).text("Отправить анкету")
    }

    if(current_index + 1 > length - 1) {
        form_data = []

        $(".form-list").children(".form-list__item").each(function () {
            form_data.push($(this).find(".selected").children(".field__text").text())
        })
        $(".form-page").hide()
        $(".submit-page").show()

        formSubmit(form_data)
    } else {
        $(list).eq(current_index).removeClass("current")
        $(list).eq(current_index + 1).addClass("current")

        updateProgress() 
    }
})

$(".field").on("click", function(e) {
    field_list = $(this).parent().children(".field")

    if($(this).hasClass("selected")) {
        $(field_list).removeClass("selected")
    } else {
        $(field_list).removeClass("selected")
        $(this).addClass("selected")
    }
})

function updateProgress() {
    list = $(".form-list").children(".form-list__item")
    length = $(list).length
    current_index = $(".form-list").find(".current").index()

    $("#form-progress").find(".form-progress__current").text(current_index+1)
    $("#form-progress").find(".form-progress__end").text(length)

    $("#form-progress").find(".progress-bar__line").css("width",(((current_index+1)/length)*100)+"%")
}

$(document).ready(function() {
    updateProgress()
});

function formSubmit(data) {
    console.log(data)
    $.ajax({
        url: '/api/formSubmit.php',
        method: 'POST',
        data: {'method': 'send_result', 'results': data},
        success: function(response) {
            // Обработка успешного ответа от API
            console.log('Данные успешно отправлены');
        },
        error: function(xhr, status, error) {
            // Обработка ошибки
            console.error('Ошибка при отправке данных:', error);
        }
    });
}


let confetti = new Confetti('submit-btn');

// Edit given parameters
confetti.setCount(75);
confetti.setSize(1);
confetti.setPower(25);
confetti.setFade(false);
confetti.destroyTarget(false);