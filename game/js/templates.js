class Tmpl {
    contructor() {
    }
    static action_menu(name, p, type) {
        return (
            '<div class="action_menu">' +
                '<div class="chip purple white-text z-depth-1">' +
                    '<img src="img/icon.png">' +
                    '<span class="op">' + name + '</span>' +
                    '<span class="point ' + ((type == "m") ? 'blue' : 'pink') + '">' + p + '</span>' +
                '</div>' +
            '</div>'
        );
    }
    static action(name, p, type) {
        return (
            '<div class="action">' +
                '<div class="chip purple white-text z-depth-1">' +
                    '<img src="img/icon.png">' +
                    '<span class="op">' + name + '</span>' +
                    '<span class="point ' + ((type == "m") ? 'blue' : 'pink') + '">' + p + '</span>' +
                '</div>' +
            '</div>'
        );
    }
    static variable_menu(text) {
        return (
            '<div class="variable_menu">' +
                '<div class="chip red darken-4 white-text z-depth-1">' + text + '</div>' +
            '</div>'
        );
    }
    static variable(text) {
        return (
            '<div class="variable">' +
                '<div class="chip red darken-4 white-text z-depth-1">' +
                    '<input class="value" value="'+text+'">' +
                '</div>' +
            '</div>'
        );
    }
    static statement_menu(name) {
        return (
            '<div class="statement_menu">' +
                '<div class="chip blue accent-4 white-text z-depth-1">' +
                    '<img src="img/icon.png">' +
                    '<span class="op">' + name + '</span>' +
                '</div>' +
            '</div>'
        );
    }
    static statement() {
        return (
            '<div class="statement">' +
                '<div class="state-name">if</div>' +
                '<div class="condition">' +
                    '<div class="cond-value"></div>' +
                    '<div class="cond-sign">' +
                        '<select name="sign" class="sign">' +
                            '<option selected="selected">==</option>' +
                            '<option>!=</option>' +
                            '<option>></option>' +
                            '<option><</option>' +
                            '<option>>=</option>' +
                            '<option><=</option>' +
                            '<option>&|</option>' +
                        '</select>' +
                    '</div>' +
                    '<div class="cond-value"></div>' +
                '</div>' +
                '<div class="codainer sortable"></div>' +
            '</div>'
        );
    }
    static expression() {
        return (
            '<div class="expression">' +
                '<div class="chip red darken-4 white-text z-depth-1">' +
                    '<input class="value" value="">' +
                '</div>' +
            '</div>'
        );
    }
}