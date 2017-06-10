/**
 * Created by ziv on 10/06/2017.
 */
const LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');
const util = require('../util');

translate = function(text){
    var language_translator = new LanguageTranslatorV2({
        username: process.env.TRANSLATOR_USER_NAME,
        password: process.env.TRANSLATOR_PASSWORD,
        url: 'https://gateway.watsonplatform.net/language-translator/api'
    });

    return new Promise((resolve,reject) => {
            language_translator.translate({
                text: text,
                source : 'en',
                target: 'de'
            },
            function (err, translation) {
                if (err) {
                    console.log('error:', err);
                    reject(err);
                }
                else {
                    console.log(JSON.stringify(translation, null, 2));
                    resolve(translation);
                }
            });
    });
};

module.exports = function (param) {
    var	channel		= param.channel,
        response;

    translate(param.args.join(' ')).then(function(translatedText){
        response = [];
        response.push(translatedText.translations[0].translation);
        util.postMessage(channel, response);
    });
    // if (!param.args.length) {
    //     response = _helpAll();
    // }
    // else {
    //     response = _helpCommand(param.args[0]);
    // }


};
