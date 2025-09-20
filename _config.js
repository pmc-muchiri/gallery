// var config = {}

// // Update to have your correct username and password
// config.mongoURI = {
//     production: 'mongodb+srv://pmc:k1juyg@gallery.wc344.mongodb.net/darkroom?retryWrites=true&w=majority',
//     development: 'mongodb+srv://pmc:k1juyg@gallery.wc344.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
//     test: 'mongodb+srv://pmc:k1juyg@gallery.wc344.mongodb.net/darkroom-test?retryWrites=true&w=majority',
// }
// module.exports = config;




var config = {}

config.mongoURI = {
    production: 'mongodb+srv://pmc:k1juyg@muchiricluster.yyp6cdr.mongodb.net/darkroom?retryWrites=true&w=majority&appName=muchiriCluster',
    development: 'mongodb+srv://pmc:k1juyg@muchiricluster.yyp6cdr.mongodb.net/darkroom-dev?retryWrites=true&w=majority&appName=muchiriCluster',
    test: 'mongodb+srv://pmc:k1juyg@muchiricluster.yyp6cdr.mongodb.net/darkroom-test?retryWrites=true&w=majority&appName=muchiriCluster',
}

module.exports = config;

