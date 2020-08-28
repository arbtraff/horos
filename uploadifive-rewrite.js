;(function() {
	var oUploadifive = jQuery.fn.uploadifive;

	if ( window.file_upload_blocking  ) {
        $.fn.uploadifive = function () {
            if ($(this).parents('.gc-comment-form').length > 0) {
                return oUploadifive.apply(this, arguments);
            }

            if (Number(window.storage_usage_percent) > 0) {
                $(this).replaceWith($("<div style='color: red'>Хранилище заполнено на " + window.storage_usage_percent + "%<br/> Чтобы загружать файлы нужно <a target='_blank' style='font-weight: bold; color: red;text-decoration: underline' href='/saas/account/show?files=1'>увеличить объем хранилища</a></div>"));
            } else {
                $(this).replaceWith($("<div class='margin-top-10 text-muted'>" + Yii.t('common', 'Загрузка файлов невозможна — закончилось место в файловом хранилище') + "</div>"));
            }
        }
	}
	else {
		if ( window.storage_usage_percent > 75 ) {
			$.fn.uploadifive = function () {
				if ( $(this).parents('.gc-comment-form').length > 0 ) {
					return oUploadifive.apply(this,arguments);
				}

				$("<div style='color: orangered'>Хранилище заполнено на " + window.storage_usage_percent + "%<br/> Рекомендуем <a target='_blank' style='color: orangered;text-decoration: underline' href='/saas/account/show?files=1'>увеличить объем хранилища</a></div>").appendTo($(this).parent())
				oUploadifive.apply(this,arguments)

			}

		}
	}
})();
