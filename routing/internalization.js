var translations = {
    // English
    "en-US": {
        localeName: "en-US",
        headerTitle: "Data master",
        resetFilters: "Reset filters",
        changeLocale: "Change language:",
        addRow: "Add row",
        clearSelection: "Clear selection",
        deleteRow: "Delete row",
        title: "Title",
        content: "Content",
        place: "Place",
        date: "Date",
        priority: "Priority",
        noItemSelected: "No item selected",
        dataSaved: "Data saved",
        reservedButton: "Reserved botton"
    },

    // Russian
    "ru-RU": {
        localeName: "ru-RU",
        headerTitle: "Мастер данных",
        resetFilters: "Сбросить фильтры",
        changeLocale: "Сменить язык:",
        addRow: "Добавить ряд",
        clearSelection: "Снять выделение",
        deleteRow: "Удалить ряд",
        title: "Название",
        content: "Содержание",
        place: "Место",
        date: "Время",
        priority: "Приоритет",
        noItemSelected: "Нет выбранных рядов",
        dataSaved: "Данные сохранены",
        reservedButton: "Зарезервировано..."
    }
};

function changeLocale(locale) {
    localizator = translations[locale];

    $$("headerContainer").define("template", localizator.headerTitle);
    $$("headerContainer").refresh();

    $$("resetFiltersContainer").define("value", localizator.resetFilters);
    $$("resetFiltersContainer").refresh();

    $$("changeLocale").define("label", localizator.changeLocale);
    $$("changeLocale").refresh();

    $$("addRow").define("value", localizator.addRow);
    $$("addRow").refresh();

    $$("clearSelection").define("value", localizator.clearSelection);
    $$("clearSelection").refresh();

    $$("deleteRow").define("value", localizator.deleteRow);
    $$("deleteRow").refresh();

    $$("grid").config.columns[0].header = localizator.title;
    $$("grid").refreshColumns();

    $$("grid").config.columns[1].header = localizator.content;
    $$("grid").refreshColumns();

    $$("grid").config.columns[2].header = localizator.place;
    $$("grid").refreshColumns();

    $$("grid").config.columns[3].header = localizator.date;
    $$("grid").refreshColumns();

    $$("grid").config.columns[4].header = localizator.priority;
    $$("grid").refreshColumns();

    webix.i18n.setLocale(locale);
};