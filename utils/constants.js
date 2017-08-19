var URL = require('url');
var myURL = 'https://localhost:4001';
const myURLQ = URL.parse(myURL, true)

var constants = {
    messageKyes: {
        code_200 : 'Success',
        code_402 : 'Incomplete data.',
        code_500 : 'Internal server error.'
    }
};

var stripeKeys = {
	skKey: "sk_test_YAOabvUScrHlzlW5I8WUFo2H"
};
module.exports = {
	constants: constants,
	myURLQ : myURLQ,
	stripeKeys: stripeKeys
}
